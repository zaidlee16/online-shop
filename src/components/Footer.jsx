import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4 text-teal-500">About Us</h3>
            <p className="text-sm leading-relaxed text-gray-400 dark:text-gray-300">
              We are a platform that provides a variety of quality products at
              affordable prices. Our mission is to offer an easy, safe, and
              enjoyable shopping experience for all users.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-teal-500">
              Important Links
            </h3>
            <ul className="space-y-2 dark:text-gray-300">
              <li>
                <a
                  href="/"
                  className="text-sm hover:text-teal-500 hover:underline transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/product"
                  className="text-sm hover:text-teal-500 hover:underline transition duration-200"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm hover:text-teal-500 hover:underline transition duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm hover:text-teal-500 hover:underline transition duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-teal-500">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-300">
              <li>
                <span className="font-medium text-gray-300">Email:</span>{" "}
                zaidzaid1807@gmail.com
              </li>
              <li>
                <span className="font-medium text-gray-300">Phone:</span> +62
                81219825331
              </li>
              <li>
                <span className="font-medium text-gray-300">Address:</span>{" "}
                Bogor, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Online Shopping Platform. All
            Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-teal-500 transition duration-200"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-500 transition duration-200"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-500 transition duration-200"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
