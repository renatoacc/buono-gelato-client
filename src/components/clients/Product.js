import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";

export default function Product() {
  const params = useParams();
  const [oneProduct, setOneProduct] = useState({});
  const [quantity, setQuantity] = useState({ quantity: "" });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // logout , removeUserFromContext

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleQuantity = (event) => {
    setQuantity({ [event.target.name]: event.target.value });
  };

  const orderProduct = { ...oneProduct, quantity: quantity.quantity };
  console.log(orderProduct);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(API_BASE_URL + "/product/" + params.id);
      setOneProduct(data);
    }
    getData();
  }, [params]);

  //   const addCart

  return (
    <div className="singleProduct">
      <h1>{oneProduct.name}</h1>
      <p>{oneProduct.description}</p>
      <p>{oneProduct.price}€</p>
      <input
        className="quantity"
        name="quantity"
        type="number"
        min={1}
        max={10}
        value={quantity.quantity}
        placeholder="Quantity"
        onChange={handleQuantity}
      />
      <button className="buttonsBuono">Add product</button>
    </div>
  );
}
