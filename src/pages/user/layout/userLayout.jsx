import React, { useState } from "react";
import Header from "../../../components/header/adminHeader";
import Sidebar from "../../../components/sidebar";
export default function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (

      <div className="relative">
        <Header toggleSidebar={toggleSidebar} />
        <div className="flex">
          {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} />}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
  );
}
