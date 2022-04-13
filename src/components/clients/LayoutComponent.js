import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/img/logo2.png";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { ShoppingCartContext} from "../../context/ShoppingCartProvider";

export default function LayoutComponent() {
  const navigate = useNavigate();
  const { shoppingCart } = useContext(ShoppingCartContext);
  const { user, addUserToContext,removeUserFromContext  } = useContext(AuthContext);
 console.log(shoppingCart);
 
  async function getUser() {
    const { data } = await axios.get(API_BASE_URL + "/logged");
    if (data) {
      addUserToContext(data);
    } else {
      navigate("/login");
    }
  }


  //console.log(numberOfItemsInCart)
  useEffect(() => {
    if (!user) {
      getUser();
    } 
  }, [user]);

  const logout = async () => {
    try {
      const response = await axios.post(API_BASE_URL + "/logout");
      //console.log(response.data);
      removeUserFromContext();
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("there was an error logging out");
    }
  };


  return (
    <div className="layout">
      <div className="header">
        <nav className="nav container">
          <p className="nav__logo">Buono Gelato</p>
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="./profile" className="nav__link">
                  <box-icon
                    color="#133b60"
                    className="nav__icon"
                    name="user"
                  ></box-icon>
                  <span className="nav__name">Profile</span>
                </Link>
              </li>
              <li className="nav__item">
                <Link to="./shop" className="nav__link">
                  <box-icon
                    color="#133b60"
                    className="nav__icon"
                    type="solid"
                    name="store"
                  ></box-icon>
                  <span className="nav__name">Shop</span>
                </Link>
              </li>
              <li className="nav__item">
                <Link to="./cart" className="nav__link">
                {shoppingCart && shoppingCart.length > 0 ?<span className="badge">{shoppingCart.length}</span> : null }
                  <box-icon
                    className="nav__icon"
                    color="#133b60"
                    name="cart-alt"
                  ></box-icon>
                  <span className="nav__name">Cart</span>
                </Link>
              </li>
              <li className="nav__item">
                <Link to="./favorit" className="nav__link">
                  <box-icon
                    color="#133b60"
                    className="nav__icon"
                    type="solid"
                    name="heart"
                  ></box-icon>
                  <span className="nav__name">Favorit</span>
                </Link>
              </li>
              <li className="nav__item">
                <button className="nav__link" onClick={logout}>
                  <box-icon
                    className="nav__icon"
                    color="#133b60"
                    name="log-out"
                  ></box-icon>
                  <span className="nav__name">Logout</span>
                </button>
              </li>
            </ul>
          </div>
          <img src={Logo} alt="buono logo" className="nav__img" />
        </nav>
        <div> <ToastContainer  /> </div>
      </div>
      <Outlet />
    </div>
  );
}
