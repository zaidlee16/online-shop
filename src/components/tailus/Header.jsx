import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supaClient";
import Theme from "../daisyui/Theme";
import Swal from "sweetalert2";

const Header = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        setUserProfile(user.user);
      }
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUserProfile(session.user);
        } else {
          setUserProfile(null);
        }
      }
    );

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);

    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    // Directly navigate without causing re-renders that trigger refresh
    navigate("/", { replace: true });
  };

  const toggleCartMenu = () => {
    setCartMenuOpen(!cartMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 backdrop-blur-lg navbar shadow-md shadow-gray-600/5 z-50 py-5 px-8">
        <div className="w-full flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            Madura Cok
          </Link>
          <div className="flex items-center gap-8 ml-auto">
            <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
              <li>
                <Link to="/" className="hover:text-teal-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-teal-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className="hover:text-teal-500 transition-colors"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-teal-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
            {userProfile ? (
              <div className="flex items-center gap-4">
                {/* Cart Icon */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                    onClick={toggleCartMenu}
                  >
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="badge badge-sm indicator-item">8</span>
                    </div>
                  </div>
                  {cartMenuOpen && (
                    <div className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                      <div className="card-body">
                        <span className="text-lg font-bold">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                          <Link
                            to="/cart"
                            className="btn btn-primary btn-block"
                          >
                            View cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Avatar and Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                    onClick={toggleProfileMenu}
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="User Avatar"
                        src={
                          userProfile.user_metadata?.avatar_url ||
                          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDxUPDw8VFRUVFRUVFRUVFRUVFRUPFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDi0ZFRkrKys3NysrKystNystNystKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFBAAFQAAAAAKKCKgiqIoCKioKgCgIqoAKVFABAAFQCACoAgAAAAKCAAAAAIKAKEBQKCCUVBFEAUAUAAA1QARAFURQQRFRQABUwUAEFUBBDFRRQEAAAAAABFQRRBRQEAAABVKCoAiggCogoggCigIqKigIqAAAKgCgAKgCoAIKioAIAACoqgAgBqioAAACKIqAAqoCAAAKgAAKIoAAAAFRQEAUBREAARQUNVFRUDQAAAAEAAVAAAAAAAAAQVAVQAAAAAAAAAAAAAAAAAAAEUUQVEFQAAAAAABAAANBVAACACKUEVAFVFBBQHKiKigIoAAACCgIAIACgAgAAAAACiAqgAAAAAAAoiggCgAAqQQAFABBBUAAEAAEUUAEABQABQEUAAwAAADAAFRVBFRAVFBAKAAoIqIACoAAAIAAAAAACoCqigAAEAAVFBFQUUEQAAAAEUBAFQAAAAAAARQAAVFABEURRQABUUEUAQBQAAAAARBAUAAAAAEABRUBAUBQAAAAAQBRQABUAAFEAAAEKkUBIVQEUARQBAAWAIoAIEAUgCi1AQFgAigBRQCAKP/9k="
                        }
                      />
                    </div>
                  </div>
                  {profileMenuOpen && (
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                      <li>
                        <Link to="/profile" className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="text-red-500">
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="btn bg-teal-500 text-white hover:bg-teal-600 px-4 py-2 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
            <Theme />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
