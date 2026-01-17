import React from "react";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import TalantHome from "./components/TalantHome/TalantHome";
import SignIn from "./pages/Auth/SignIn";

const App = () => {
  return (
    <div>
      <Header />
      <TalantHome />
      <SignIn/>
      <Footer />
    </div>
  );
};

export default App;
