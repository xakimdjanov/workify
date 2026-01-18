import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 ml-64 md:p-6 talent-sidebar">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
