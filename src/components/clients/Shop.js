import { API_BASE_URL } from "../../consts";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";

export default function Shop() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function listProducts() {
      try {
        const { data } = await axios.get(API_BASE_URL + "/shop");
        console.log(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    listProducts();
  }, []);
  console.log(data);
  return <div>Shop</div>;
}
