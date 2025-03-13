import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import supabase from "../utils/supaClient";

const fetchCartItems = async () => {
  const { data, error } = await supabase
    .from("cart")
    .select("id, quantity, product:product_id(id, product_name, price, img)");

  if (error) throw new Error(error.message);
  return data;
};

const CartPage = () => {
  const queryClient = useQueryClient();

  const {
    data: cartItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["cart"], queryFn: fetchCartItems });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("cart").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const getTotalPrice = () =>
    cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (isError)
    return <p className="text-red-500 text-center">Error: {error.message}</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
          Shopping Cart
        </h2>

        {cartItems.length > 0 ? (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700"
                >
                  <img
                    src={item.product.img}
                    alt={item.product.product_name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-lg font-semibold">
                      {item.product.product_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-teal-500 font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.product.price * item.quantity)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(item.id)}
                    className="text-red-500 hover:text-red-700 transition-all"
                  >
                    <FaTrash size={20} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <h3 className="text-xl font-bold">
                Total:
                <span className="text-teal-500 ml-2">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(getTotalPrice())}
                </span>
              </h3>
            </div>

            <div className="flex justify-between mt-6">
              <Link
                to="/"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Kembali Berbelanja
              </Link>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all">
                Lanjutkan Transaksi
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Keranjang kamu kosong.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
