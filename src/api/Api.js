import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../fireabase.config";


const db = getFirestore(app);

export async function productsData() {
  const products = []; 

  try {
    const productsCollection = collection(db, "products");
    
    const snapshot = await getDocs(productsCollection);

    // Iterate through the documents in the collection
    snapshot.forEach((doc) => {
      const productData = doc.data();
      products.push(productData);
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
