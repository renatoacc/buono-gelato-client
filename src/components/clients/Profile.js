import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";

export default function Profile() {
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext); // logout , removeUserFromContext

  async function getUser() {
    const { data } = await axios.get(API_BASE_URL + "/logged");
    if (data) {
      addUserToContext(data);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Link testes</p>
      <Link to={"/showproducts"}>Products</Link>
      <Link to={"/products"}>Create products</Link>
      <Link to={"/showingredients"}>Ingredients</Link>
      <Link to={"/ingredients"}>Create ingredients</Link>
    </div>
  );
}
