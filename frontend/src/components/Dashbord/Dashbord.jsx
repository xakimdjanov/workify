import React from 'react'
import Dashbord1 from "../../pages/Dashboard1/Dashboard1"
import Dashbord2 from "../../pages/Dashboard2/Dashboard2"
import Dashbord3 from "../../pages/Dashboard3/Dashboard3"

const Dashbord = () => {
  return (
    <div>
            <h2 className="bg-white py-4 pl-8 rounded-xl text-xl font-semibold">
        Dashboard
      </h2>
      <div className='flex justify-between'>
      <Dashbord1 />
      <Dashbord2 />
      </div>
      <Dashbord3 />
    </div>
  )
}

export default Dashbord