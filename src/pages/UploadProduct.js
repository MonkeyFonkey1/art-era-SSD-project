import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../fireabase.config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UploadProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const userInfo = useSelector((state) => state.bazar.userInfo);

  const db = getFirestore(app);
  const storage = getStorage(app);

  const handleImageUpload = async () => {
    if (!image) return null;
    const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("Please log in to upload a product.");
      return;
    }

    if (!title || !description || !price || !image) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const imageURL = await handleImageUpload();
      const productData = {
        title,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        image: imageURL,
        sellerEmail: userInfo.email,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "products"), productData);

      toast.success("Product uploaded successfully!");
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

  return (
    <div className="upload-form">
      <h2>Upload a Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default UploadProduct;
