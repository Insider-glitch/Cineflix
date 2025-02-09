import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`bg-neutral-900 text-white transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{
        width: "16rem",
        position: "sticky",
        top: "64px",
        height: "calc(100vh - 60px)",
      }}
    >
      <nav className="my-10">
        <ul>
          <li className="hover:bg-gray-700">
            <NavLink
              to="/Cineflix"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-800" : ""}`
              }
            >
              Movies
            </NavLink>
          </li>
          <li className="hover:bg-gray-700">
            <NavLink
              to="/premium"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-800" : ""}`
              }
            >
              Premium
            </NavLink>
          </li>
          
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
