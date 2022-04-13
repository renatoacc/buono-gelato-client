import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CountryProvider } from "./context/CountryProvider";
import { AuthProvider } from "./context/AuthProvider";
import { ShoppingCartProvider } from "./context/ShoppingCartProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CountryProvider>
        <AuthProvider>
          <ShoppingCartProvider >
          <App />
          </ShoppingCartProvider>
        </AuthProvider>
      </CountryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
