import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashbord/Dashbord";

import TalantHome from "./components/TalantHome/TalantHome";
import SignIn from "./pages/Auth/SignIn";
import RegistrationForm from "./pages/RegistrationPage/RegistrationPage";
import RegistrationFormStepTwo from "./pages/RegistrationFormStepTwo/RegistrationFormStepTwo";
import RegistrationFormStepThree from "./pages/RegistrationFormStepThree/RegistrationFormStepThree";
import JobMatches from "./components/JobMatches/JobMatches";

function App() {
  return (
    <Routes>
      {/* Public routes */}
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

      {/* Dashboard layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<div>Profile page</div>} />
        <Route path="/matches" element={<JobMatches />} />
        <Route path="/settings" element={<div>Settings page</div>} />
      </Route>
    </Routes>
  );
}

export default App;
