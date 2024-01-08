import React from "react";
import ProductsCard from "./ProductsCard";

const Products = ({ products }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          get your daily dose of art
        </h1>
        <p className="text-xs text-gray-500 text-center mb-4">
        <strong>buy art from living artists!</strong>
          <br />
          (the dead ones don't need the money)
        </p>
        <span className="w-20 h-[3px] bg-black"></span>
        <p className="max-w-[700px] text-gray-600 text-center">
          Welcome to ArtEra where we believe that art is the lifeblood of the soul.
          Explore a curated collection, find your favorites, and even take them home.
          Feel free to express yourself by uploading your creations to our website.
          In the realm of ArtEra, there are no rules, just boundless creativity.
          Welcome to a world without limits!
          <br />
          <br />
          "Everything you can imagine is real"
          <br />
          -Pablo Picasso-
        </p>
      </div>
      {/* =================== Products Start here ================= */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-10 py-10">
        {products.map((item) => (
          <ProductsCard key={item._id} product={item} />
        ))}
      </div>
      {/* =================== Products End here =================== */}
    </div>
  );
};

export default Products;
