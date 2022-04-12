import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/img/logo2.png";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

export default function LayoutComponentAdmin() {
  const navigate = useNavigate();
  const { removeUserFromContext } = useContext(AuthContext);

  const logout = async () => {
    try {
      const response = await axios.post(API_BASE_URL + "/logout");
      console.log(response.data);
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
                <Link to="./showproducts" className="nav__link">
                  <box-icon
                    className="nav__icon"
                    color="#133b60"
                    name="list-ul"
                  ></box-icon>
                  <span className="nav__name">Products</span>
                </Link>
              </li>
              <li className="nav__item">
                <Link to="./showingredients" className="nav__link">
                  <box-icon
                    className="nav__icon"
                    color="#133b60"
                    name="list-ul"
                  ></box-icon>
                  <span className="nav__name">Ingredients</span>
                </Link>
              </li>
              <li className="nav__item">
                <Link to="./vieworders" className="nav__link">
                  <box-icon
                    className="nav__icon"
                    color="#133b60"
                    name="book-content"
                  ></box-icon>
                  <span className="nav__name">Ordes</span>
                </Link>
              </li>
              <li className="nav__item">
                <button className="nav__link" onClick={logout}>
                  <box-icon
                    color="#133b60"
                    className="nav__icon"
                    name="log-out"
                  ></box-icon>
                  <span className="nav__name">Logout</span>
                </button>
              </li>
            </ul>
          </div>
          <img src={Logo} alt="buono logo" className="nav__img" />
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
