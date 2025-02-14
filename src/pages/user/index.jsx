import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./layout/userLayout";
import Movies from "./pages/content";
import Premium from "./pages/premium";
import Frame from "./pages/frame";
import { SearchProvider } from "../../context/searchContext";

export default function UserRoutes() {
  return (
    <SearchProvider>
      <UserLayout>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="frame" element={<Frame />} />
          <Route path="premium" element={<Premium />} />
        </Routes>
      </UserLayout>
    </SearchProvider>
  );
}
