import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/clients/Home";
import LayoutComponent from "./components/clients/LayoutComponent";
import Signup from "./components/clients/Signup";
import { useContext } from "react";
import { CountryContext } from "./context/CountryProvider";
import Login from "./components/clients/Login";

function App() {
  const { country, toggleCountry } = useContext(CountryContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route element={<LayoutComponent />}></Route>
      </Routes>
    </div>
  );
}

export default App;
