import logo from "../../assets/img/logo.png";
import axios from "axios";
import { API_BASE_URL, getCsrfToken } from "../../consts";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState } from "react";

export default function Login() {
  const [errorState, setErrorState] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { addUserToContext } = useContext(AuthContext);

  const handleUserState = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_BASE_URL + "/login", user);
      console.log(response.data);
      addUserToContext(response.data.user);
      getCsrfToken();
      navigate("/profile");
    } catch (err) {
      setErrorState({ message: err.response.data.erroMessage });
    }
  };

  return (
    <div className="formsPage">
      <img src={logo} alt="Buono Gelato" />
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          name="email"
          placeholder="email"
          type="email"
          value={user.email}
          onChange={handleUserState}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          value={user.password}
          onChange={handleUserState}
        />

        <button className="buttonsBuono">Login</button>
        <Link className="link" to={"/signup"}>
          Signup
        </Link>
      </form>
    </div>
  );
}
