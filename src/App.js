import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/clients/Home";
import LayoutComponent from "./components/clients/LayoutComponent";
import Signup from "./components/clients/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<LayoutComponent />}></Route>
      </Routes>
    </div>
  );
}

export default App;
