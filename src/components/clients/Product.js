import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../consts";

export default function Product() {
  const params = useParams();
  const [oneProduct, setOneProduct] = useState({});
  const [quantity, setQuantity] = useState("");

  const handleQuantity = (event) => {
    setQuantity({ ...oneProduct, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(API_BASE_URL + "/product/" + params.id);
      setOneProduct(data);
    }
    getData();
  }, [params]);

  return (
    <div>
      <h1>{oneProduct.name}</h1>
      <p>{oneProduct.description}</p>
      <p>{oneProduct.price}€</p>
      <input
        name="quantity"
        type="Number"
        min={0}
        max={10}
        value={oneProduct.quantity}
        placeholder="Quantity"
        onChange={handleQuantity}
      />
    </div>
  );
}
