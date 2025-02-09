import React, { useState } from "react";
import Header from "../../../components/header/adminHeader";
import Sidebar from "../../../components/admin/adminSidebar";

export default function AdminLayout( { children } ) {
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

