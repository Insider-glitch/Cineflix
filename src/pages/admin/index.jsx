import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/adminLayout";
import Dashboard from "./pages/dashboard";
import MoviesPage from "./pages/movies";
import UsersPage from "./pages/users";

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
