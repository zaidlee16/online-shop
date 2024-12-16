import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "../components/daisyui/Card";
import supabase from "../utils/supaClient";
import { Link } from "react-router-dom";
import Header from "../components/tailus/Header";
import Footer from "../components/Footer";
import SideBar from "../components/home/SideBar";

const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("product")
    .select("id, product_name, price, description, img, type");

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

const ProductPage = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [kategori, setKategori] = useState([]); // State untuk kategori filter

  const itemsPerPage = 8;

  // Filter produk berdasarkan pencarian dan kategori
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = kategori.length
      ? kategori.includes(product.type)
      : true;
    return matchesSearch && matchesCategory;
  });

  // Sorting produk
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.product_name.localeCompare(b.product_name);
    } else {
      return b.product_name.localeCompare(a.product_name);
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#38b2ac" size={50} />
      </div>
    );
  }

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header />
      <div className="flex justify-between my-10 dark:text-white">
        {/* Sidebar */}
        <div className="w-full sm:w-1/4 md:w-1/4 lg:w-1/4">
          <SideBar
            setSearchQuery={setSearchQuery}
            setSortOrder={setSortOrder}
            setKategori={setKategori} // Passing kategori handler ke Sidebar
          />
        </div>

        {/* Product Grid */}
        <div className="w-full sm:w-3/4 md:w-3/4 lg:w-3/4">
          <h2 className="text-5xl font-bold text-center mb-8">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {paginatedProducts.map((item) => (
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

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <ul className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <li key={page}>
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === page
                          ? "bg-teal-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
