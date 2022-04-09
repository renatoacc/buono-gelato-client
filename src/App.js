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
import { getCsrfToken } from "./consts";
import Product from "./components/clients/Product";
import Cart from "./components/clients/Cart";
import CreateProduct from "./components/admin/ProductsManage";
import Upload from "./components/clients/UploadImage";
import CreateIngredient from "./components/admin/IngredientsManage";
import ShowProducts from "./components/admin/ProductsList";
import ShowIngredients from "./components/admin/IngredientsList";

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
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<CreateProduct />} />
          <Route path="ingredients" element={<CreateIngredient />} />
          <Route path="showproducts" element ={<ShowProducts />} />
          <Route path="showingredients" element ={<ShowIngredients />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
