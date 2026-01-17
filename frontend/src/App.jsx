import RegistrationForm from "./pages/RegistrationPage/RegistrationPage";
import RegistrationFormStepTwo from "./pages/RegistrationFormStepTwo/RegistrationFormStepTwo";
import RegistrationFormStepThree from "./pages/RegistrationFormStepThree/RegistrationFormStepThree";
// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import TalantHome from "./components/TalantHome/TalantHome";
import SignIn from "./pages/Auth/SignIn";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<TalantHome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/registration/step-1" element={<RegistrationForm />} />
        <Route
          path="/registration/step-2"
          element={<RegistrationFormStepTwo />}
        />
        <Route
          path="/registration/step-3"
          element={<RegistrationFormStepThree />}
        />
      </Routes>
      <Footer />
      <Routes>
        <Route path="/" element={<TalantHome />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
