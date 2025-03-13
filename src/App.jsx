import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/tailus/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Login from "./Auth/Login";
import Register from "./Auth/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductsPage";
import DetailProduct from "./components/product/DetailProduct";
import CounterApp from "./pages/CounterApp";
import { useCart } from "./utils/store/useCart";

const App = () => {
  const { fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<DetailProduct />} />

          <Route path="/counter" element={<CounterApp />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
