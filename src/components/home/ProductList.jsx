// ProductList.js
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import supabase from "../../utils/supaClient";
import Card from "../daisyui/Card";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("product")
    .select("id, product_name, price, description, img");

  if (error) throw new Error(error.message);
  return data;
};

const formatCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const ProductList = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    checkUser();
  }, []);

  const addToCartMutation = useMutation({
    mutationFn: async (product) => {
      const { error } = await supabase.from("cart").insert({
        product_id: product.id,
        quantity: 1,
        user_id: user.id,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      navigate("/cart");
    },
  });

  const handleAddToCart = (product) => {
    if (!user) {
      alert("You need to login first to add items to the cart.");
      navigate("/login");
      return;
    }
    addToCartMutation.mutate(product);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#38b2ac" size={50} />
      </div>
    );

  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="my-10 dark:text-white px-6">
      <h2 className="text-5xl font-bold text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-8">
        {products.slice(0, 4).map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.product_name}
            price={item.price}
            description={item.description}
            image={item.img}
            userId={user?.id}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          className="btn bg-teal-500 text-white hover:bg-teal-600 py-2 px-4 rounded-md transition-colors duration-300"
          to="/product"
        >
          View More Products
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
