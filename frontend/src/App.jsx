// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import TalantHome from "./components/TalantHome/TalantHome";
import SignIn from "./pages/Auth/SignIn";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TalantHome />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
