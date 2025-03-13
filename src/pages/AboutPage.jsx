import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/tailus/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto p-6 pt-32">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-teal-600 dark:text-teal-400">
          About Us
        </h1>

        <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
            About Jejet Store
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-8">
            Jejet Store is a trusted online shop that provides a wide range of
            high-quality products, from fashion and electronics to home
            essentials. Established in 2024, our mission is to offer customers a
            seamless and enjoyable shopping experience. We are committed to
            delivering excellent service and ensuring customer satisfaction.
          </p>
        </section>

        <section className="bg-teal-50 dark:bg-teal-100 p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-900 mb-6">
            Vision & Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-600 leading-8">
                To become the most reliable and customer-focused online store in
                Indonesia, offering innovative solutions and creating value for
                everyone involved.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-800 mb-4">
                Our Mission
              </h3>
              <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 dark:text-gray-600">
                <li>Deliver top-notch products with uncompromised quality.</li>
                <li>Provide a smooth and enjoyable shopping experience.</li>
                <li>
                  Build trust and long-term relationships with our customers.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
            Contact Information
          </h2>
          <ul className="list-none space-y-6">
            <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-500 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12v1m0-4v1m-4 3a4 4 0 118-0 4 4 0 11-8 0zM12 20h.01M16 12V4m0 8a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="font-medium text-gray-900 dark:text-white">
                Email:
              </span>{" "}
              zaidzaid1807@gmail.com
            </li>
            <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-500 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11M9 21v-8a1 1 0 00-1-1H5a1 1 0 00-1 1v8m4 0h2M3 5h11m2-2a1 1 0 01-1 1H5a1 1 0 01-1-1V2a1 1 0 011-1h6a1 1 0 011 1v1M17 16v-1a1 1 0 00-1-1h-4a1 1 0 00-1 1v1m6 0h-2M7 16v-1a1 1 0 011-1h4a1 1 0 011 1v1m-6 0h2"
                />
              </svg>
              <span className="font-medium text-gray-900 dark:text-white">
                Phone:
              </span>{" "}
              +62 81219825331
            </li>
            <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-500 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11M9 21v-8a1 1 0 00-1-1H5a1 1 0 00-1 1v8m4 0h2M3 5h11m2-2a1 1 0 01-1 1H5a1 1 0 01-1-1V2a1 1 0 011-1h6a1 1 0 011 1v1M17 16v-1a1 1 0 00-1-1h-4a1 1 0 00-1 1v1m6 0h-2M7 16v-1a1 1 0 011-1h4a1 1 0 011 1v1m-6 0h2"
                />
              </svg>
              <span className="font-medium text-gray-900 dark:text-white">
                Address:
              </span>{" "}
              Bogor, Indonesia
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
