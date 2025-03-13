import React, { useState } from "react";
import Header from "../components/tailus/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out!");
  };

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-6 pt-32">
        <h1 className="text-5xl font-bold text-center text-teal-600 dark:text-teal-400 mb-10">
          Contact Us
        </h1>

        <section className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-semibold text-teal-700 dark:text-teal-300 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Have a question, feedback, or just want to say hello? Fill out the
            form below and we’ll get back to you as soon as possible. Let’s
            start a conversation!
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">
            Contact Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-lg text-gray-700 dark:text-gray-200 font-medium mb-2"
              >
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg text-gray-700 dark:text-gray-200 font-medium mb-2"
              >
                Your Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-lg text-gray-700 dark:text-gray-200 font-medium mb-2"
              >
                Your Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 pl-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-600 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  rows="5"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 text-white font-medium p-4 rounded-lg hover:from-teal-600 hover:to-teal-700 dark:hover:from-teal-700 dark:hover:to-teal-800 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
