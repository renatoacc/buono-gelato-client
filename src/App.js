import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/clients/Home";
import LayoutComponent from "./components/clients/LayoutComponent";
import Signup from "./components/clients/Signup";
import { useContext, useEffect } from "react";
import { CountryContext } from "./context/CountryProvider";
import Login from "./components/clients/Login";
import Profile from "./components/clients/Profile";
import Shop from "./components/clients/Shop";
import { AuthContext } from "./context/AuthProvider";
import { getCsrfToken } from "./consts";

function App() {
  const { country, toggleCountry } = useContext(CountryContext);

  useEffect(() => {
    getCsrfToken();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route element={<LayoutComponent />}>
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
