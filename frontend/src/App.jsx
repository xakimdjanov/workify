import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashbord/Dashbord";
import TalantHome from "./components/TalantHome/TalantHome";
import SignIn from "./pages/Auth/SignIn";
import RegistrationForm from "./pages/RegistrationPage/RegistrationPage";
import RegistrationFormStepTwo from "./pages/RegistrationFormStepTwo/RegistrationFormStepTwo";
import RegistrationFormStepThree from "./pages/RegistrationFormStepThree/RegistrationFormStepThree";
import JobMatches from "./components/JobMatches/JobMatches";
import ProfilePage from "./components/MyProfile/MyProfile";
import JobDetail from "./components/JobDetail/JobDetail";
import JobAlerts from "./components/JobAlerts/JobAlerts";
import CompanyDetail from "./components/CompanyDetail/CompanyDetail";
import Faq from "./pages/Faq/Faq";
import Contact from "./pages/Contact/Contact";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
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

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/alerts" element={<JobAlerts />} />
          <Route path="/matches" element={<JobMatches />} />
          <Route path="/job-post/:id" element={<JobDetail />} />
          <Route path="/job-details/:id" element={<CompanyDetail />} />
          <Route path="/settings" element={<div>Settings page</div>} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacts" element={<Contact />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
