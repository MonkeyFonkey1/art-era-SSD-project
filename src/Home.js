import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./fireabase.config"; // Import Firebase config
import Banner from "./components/Banner";
import Products from "./components/Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const db = getFirestore(app); // Initialize Firestore

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);

      const productsList = productSnapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data(),
      }));

      setProducts(productsList);
    };

    fetchProducts();
  }, [db]);

  return (
    <div>
      <Banner />
      <Products products={products} />
    </div>
  );
};

export default Home;
