// import axios from "axios";

// export async function productsData() {
//   const products = await axios.get(
//     "https://fakestoreapiserver.reactbd.com/products"
//   );
//   return products;
// }





import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../fireabase.config";

// Get a reference to the Firestore database
const db = getFirestore(app);

export async function productsData() {
  const products = []; // Initialize an empty array to store products

  try {
    // Replace 'products' with the correct name of your Firestore collection
    const productsCollection = collection(db, "products");
    
    // Get all documents from the 'products' collection
    const snapshot = await getDocs(productsCollection);

    // Iterate through the documents in the collection
    snapshot.forEach((doc) => {
      const productData = doc.data();
      products.push(productData); // Add the product details to the array
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
