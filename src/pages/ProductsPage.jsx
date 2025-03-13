import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../utils/store/useCart";
import supabase from "../utils/supaClient";
import Header from "../components/tailus/Header";
import ClipLoader from "react-spinners/ClipLoader";

const ProductPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [kategori, setKategori] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [userId, setUserId] = useState(null);
  const [priceFilter, setPriceFilter] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      let { data, error } = await supabase
        .from("product")
        .select("id, product_name, price, img, type, stock, description");

      if (error) {
        setError(error.message);
      } else {
        setProducts(data);
        setFilteredProducts(data);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= parseInt(maxPrice)
      );
    }
    if (kategori.length > 0) {
      filtered = filtered.filter((product) => kategori.includes(product.type));
    }

    if (priceFilter === "lowest") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "highest") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.product_name.localeCompare(a.product_name));
    }

    setFilteredProducts(filtered);
  }, [search, minPrice, maxPrice, kategori, sortOrder, priceFilter, products]);

  const resetFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setKategori([]);
    setSortOrder("asc");
    setFilteredProducts(products);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <ClipLoader color="#38b2ac" size={50} />
      </div>
    );
  }
  if (error) {
    return (
      <p className="text-red-500 text-xl text-center mt-10">Error: {error}</p>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 text-gray-900 dark:text-white">
        <h1 className="text-5xl font-bold text-teal-600 dark:text-teal-400 text-center pt-20 mb-8">
          Products
        </h1>
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-md"
          />

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Urutkan Harga</option>
            <option value="lowest">Harga Terendah</option>
            <option value="highest">Harga Tertinggi</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Urutkan Nama</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Semua Kategori</option>
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
            <option value="atk">ATK</option>
          </select>

          <button
            onClick={resetFilters}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Reset Filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.img}
                  alt={product.product_name}
                  className="w-40 h-40 object-cover rounded-lg mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white text-center">
                  {product.product_name}
                </h3>
                <p className="text-teal-600 font-semibold text-center">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(product.price)}
                </p>
              </Link>
              <button
                onClick={() =>
                  userId
                    ? addToCart(product, userId)
                    : alert("Silakan login terlebih dahulu")
                }
                className="mt-3 w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
