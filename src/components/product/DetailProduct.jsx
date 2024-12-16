import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import supabase from "../../utils/supaClient";

const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from("product")
    .select(
      "id, product_name, price, type, stock, description, img, created_at"
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <ClipLoader color="#38b2ac" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-xl">Error: {error}</p>
        <button
          onClick={() => navigate("/product")}
          className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-md py-2 px-4 mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12 dark:text-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-teal-600">
          {product.product_name}
        </h1>
        <p className="text-xl text-teal-400 mt-2">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(product.price)}
        </p>
      </div>

      {/* Product Image Section */}
      <div className="flex justify-center mb-8">
        <img
          src={product.img}
          alt={product.product_name}
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Product Info Section */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-700">{product.type}</p>
        <p className="text-md text-gray-600">Stock: {product.stock}</p>
        <p className="text-sm text-gray-500 mt-2">
          Added on: {new Date(product.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Description Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Description
        </h2>
        <p className="text-lg text-gray-700">{product.description}</p>
      </div>

      {/* Back Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/product")}
          className="btn bg-teal-500 hover:bg-teal-600 text-white rounded-md py-2 px-6 font-semibold text-lg"
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default DetailProduct;
