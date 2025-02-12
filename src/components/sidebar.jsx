import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`bg-neutral-900 text-white transition-transform duration-300 ease-in-out lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:w-64 lg:translate-x-0 ${isOpen ? "translate-y-0" : "-translate-y-full"} fixed left-0 top-16 h-auto w-full lg:block`}
    >
      <nav className="my-4">
        <ul>
          <li className="hover:bg-red-700">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-red-800" : ""}`
              }
            >
              Movies
            </NavLink>
          </li>
          <li className="hover:bg-red-700">
            <NavLink
              to="/premium"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-red-800" : ""}`
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
