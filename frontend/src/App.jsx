import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationPage/RegistrationPage";
import RegistrationFormStepTwo from "./pages/RegistrationFormStepTwo/RegistrationFormStepTwo";
import RegistrationFormStepThree from "./pages/RegistrationFormStepThree/RegistrationFormStepThree";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration/step-1" element={<RegistrationForm />} />
        <Route
          path="/registration/step-2"
          element={<RegistrationFormStepTwo />}
        />
        <Route
          path="/registration/step-3"
          element={<RegistrationFormStepThree  />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
