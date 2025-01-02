import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth, db, storage } from "../fireabase.config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import ProductsCard from "../components/ProductsCard";

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.bazar.userInfo);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!userInfo) return;

      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);

      const userProducts = productSnapshot.docs
        .map((doc) => ({ firestoreId: doc.id, ...doc.data() }))
        .filter((product) => product.sellerEmail === userInfo.email);

      setProducts(userProducts);
    };

    fetchProducts();
  }, [userInfo]);

  const handleImageUpload = async () => {
    if (!image) return null;
    const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !image) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const imageURL = await handleImageUpload();
      const newProduct = {
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        image: imageURL,
        sellerEmail: userInfo.email,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "products"), newProduct);
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Product uploaded successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setQuantity(1);
      setImage(null);
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Failed to upload product.");
    }
  };

  const handleDelete = async (firestoreId) => {
    try {
      await deleteDoc(doc(db, "products", firestoreId));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.firestoreId !== firestoreId)
      );
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    // Populate the form with the product details for editing
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setQuantity(product.quantity);
    setImage(null); // Handle image editing as needed
    // Implement further logic to handle the editing process
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Your Listings</h2>
      <form onSubmit={handleUpload} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upload New Product</h3>
        <div className="grid grid-cols-1 gap-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          ></textarea>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Upload Product
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductsCard
            key={product.firestoreId}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
