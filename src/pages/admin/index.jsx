import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/adminLayout";
import Dashboard from "./pages/dashboard";
import MoviesPage from "./pages/movies";
import UsersPage from "./pages/users";
import { SearchProvider } from "../../context/searchContext";

const AdminRoutes = () => {
  return (
    <SearchProvider>
      <AdminLayout>
        <Routes>
          <Route path="movies" element={<MoviesPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>
      </AdminLayout>
    </SearchProvider>

  );
};

export default AdminRoutes;
