import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/cineflix-logo.png";
import AuthModals from "../modals/authModals";
import { supabase } from "../../lib/supabase";
import { useSearch } from "../../context/searchContext";

const Header = ({ toggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data?.session);
    };
    checkAuth();
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between bg-neutral-900 p-4 pl-5 text-white">
        <i
          className="fa-solid fa-bars cursor-pointer pr-4 text-lg sm:pr-8 sm:text-xl"
          onClick={toggleSidebar}
        ></i>

        {/* Logo */}
        <Link to="/">
          <img className="w-36" src={logo} alt="Logo" />
        </Link>

        {/* Search Bar */}
        <div className="mx-4 flex flex-grow justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-11/12 rounded-l-md bg-black px-4 py-2 text-sm text-white focus:outline-none sm:py-2 sm:text-base"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="rounded-r-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 sm:py-2 sm:text-base">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        {/* Authentication Buttons */}
        <div>
          {isAuthenticated ? (
            <button
              className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800 sm:px-4 sm:text-base"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800 sm:px-4 sm:text-base"
              onClick={handleModalToggle}
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Render AuthModal */}
      {isModalOpen && <AuthModals closeModal={handleModalToggle} />}
    </>
  );
};

export default Header;
