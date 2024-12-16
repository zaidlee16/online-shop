import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "../daisyui/Card";
import supabase from "../../utils/supaClient";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("product")
    .select("id, product_name, price, description, img");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const formatCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const ProductList = () => {
  const [showAllProducts, setShowAllProducts] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#38b2ac" size={50} />
      </div>
    );

  if (isError) return <p>Error: {error.message}</p>;

  const displayedProducts = products.slice(0, 4);

  return (
    <div className="my-10 dark:text-white">
      <h2 className="text-5xl font-bold text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-8">
        {displayedProducts.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`}>
            <Card
              title={item.product_name}
              price={formatCurrency(item.price)}
              description={item.description}
              image={item.img}
            />
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          className="btn btn-teal-500 text-white hover:bg-teal-600 py-2 px-4 rounded-md transition-colors duration-300"
          to="/product"
        >
          View More Products
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
