// ProductsCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/bazarSlice';
import { ToastContainer, toast } from 'react-toastify';

const ProductsCard = ({ product, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rootId = product.title.toLowerCase().split(' ').join('');

  const handleDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: product,
      },
    });
  };

  const handleEdit = () => {
    navigate(`/edit-product/${product.firestoreId}`);
  };

  return (
    <div className="w-full relative group">
      <div
        onClick={handleDetails}
        className="w-full h-96 cursor-pointer overflow-hidden"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-110 duration-500"
          src={product.image}
          alt="productImg"
        />
      </div>
      <div className="w-full border-[1px] px-2 py-4">
        <div className="flex justify-between items-center">
          <h2 className="font-titleFont text-base font-bold">
            {product.title.substring(0, 15)}
          </h2>
          <div className="text-sm relative w-28 flex justify-end overflow-hidden">
            <div className="flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
              <p className="line-through text-gray-500">${product.oldPrice}</p>
              <p className="font-semibold">${product.price}</p>
            </div>
            <p
              onClick={() => {
                dispatch(
                  addToCart({
                    _id: product._id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                    description: product.description,
                  })
                );
                toast.success(`${product.title} is added`);
              }}
              className="absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transform -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500"
            >
              add to cart
              <BsArrowRight />
            </p>
          </div>
        </div>
        <p>{product.category}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleEdit}
            className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.firestoreId)}
            className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Delete
          </button>
        </div>
      </div>
      {product.isNew && (
        <div className="absolute top-4 right-0">
          <p className="bg-black text-white font-semibold font-titleFont px-6 py-1">
            Sale
          </p>
        </div>
      )}
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ProductsCard;
