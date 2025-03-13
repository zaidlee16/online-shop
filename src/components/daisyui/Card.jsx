import React from "react";
import { useCart } from "../../utils/store/useCart";

const Card = ({ id, title, price, description, image, userId }) => {
  const { addToCart } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300">
      <figure className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-40 h-40 object-cover transition-transform duration-500 hover:scale-110"
        />
      </figure>
      <div className="card-body p-6 flex flex-col items-center text-center">
        <h2 className="card-title text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="card-actions flex flex-col items-center">
          <span className="text-lg font-semibold text-teal-500 dark:text-teal-400">
            {formatPrice(price)}
          </span>
          <button
            className="mt-3 px-12 py-2 bg-teal-500 dark:bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 dark:hover:bg-teal-700 transition-all"
            onClick={() => addToCart({ id, title, price, image }, userId)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
