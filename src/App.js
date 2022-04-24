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
import ListFavorit from "./components/clients/ListFavorit";
import Product from "./components/clients/Product";
import Cart from "./components/clients/Cart";
import CreateProduct from "./components/admin/ProductsManage";
import CreateIngredient from "./components/admin/IngredientsManage";
import ShowProducts from "./components/admin/ProductsList";
import ShowIngredients from "./components/admin/IngredientsList";
import "boxicons";
import Instructions from "./components/clients/Instructions";
import UpdateIngredient from "./components/admin/IngredientsUpdating";
import UpdateProduct from "./components/admin/ProductsUpdating";
import { Custom404Page } from "./components/Custom404Page";
import LayoutComponentAdmin from "./components/admin/LayoutComponentAdmin";

import ShowOrders from "./components/admin/ViewOrders";

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
        <Route path="instructions" element={<Instructions />} />
        <Route element={<LayoutComponent />}>
          <Route path="profile" element={<Profile />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="favorit" element={<ListFavorit />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route element={<LayoutComponentAdmin />}>
          <Route path="products" element={<CreateProduct />} />
          <Route path="ingredients" element={<CreateIngredient />} />
          <Route path="vieworders/:id" element={<ShowOrders />} />
          <Route path="showproducts" element={<ShowProducts />} />
          <Route path="showingredients" element={<ShowIngredients />} />
          <Route path="products/:id" element={<UpdateProduct />} />
          <Route path="ingredients/:id" element={<UpdateIngredient />} />
          <Route path="/vieworders" element={<ShowOrders />} />
        </Route>
        <Route path="*" element={<Custom404Page />} />
      </Routes>
    </div>
  );
}

export default App;
