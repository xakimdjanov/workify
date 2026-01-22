// Main Dashboard component - responsive down to 400px
import React from "react";
import Dashboard1 from "../../pages/Dashboard1/Dashboard1";
import Dashboard2 from "../../pages/Dashboard2/Dashboard2";
import Dashboard3 from "../../pages/Dashboard3/Dashboard3";

const Dashboard = () => {
  return (
    <div className="w-full min-w-0 px-3 xs:px-4 sm:px-6 lg:px-8">
      <h2 className="bg-white py-3 xs:py-4 px-4 xs:px-6 sm:pl-8 rounded-xl text-base xs:text-lg sm:text-xl font-semibold mb-4 xs:mb-6">
        Dashboard
      </h2>

      <div className="flex flex-col lg:flex-row gap-4 xs:gap-6 w-full">
        <div className="w-full lg:w-auto">
          <Dashboard1 />
        </div>
        <div className="w-full lg:flex-1">
          <Dashboard2 />
        </div>
      </div>

      <div className="w-full mt-4 xs:mt-6">
        <Dashboard3 />
      </div>
    </div>
  );
};

export default Dashboard