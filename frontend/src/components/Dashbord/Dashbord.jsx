import React from "react";
import Dashbord1 from "../../pages/Dashbord1/Dashbord1";
import Dashbord2 from "../../pages/Dashbord2/Dashbord2";
import Dashbord3 from "../../pages/Dashbord3/Dashbord3";

const Dashbord = () => {
  return (
    <div>
      <h2 className="bg-white  py-4 pl-8 rounded-xl text-xl font-bold text-[#505151] ">
        Dashboard
      </h2>
      <div className="flex justify-between">
        <Dashbord1 />
        <Dashbord2 />
      </div>
      <Dashbord3 />
    </div>
  );
};

export default Dashbord;
