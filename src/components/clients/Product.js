import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";

export default function Product() {
  const params = useParams();
  const [dataUser, setDataUser] = useState({});
  const [oneProduct, setOneProduct] = useState({});
  const [quantity, setQuantity] = useState({ quantity: "" });
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

  const handleQuantity = (event) => {
    setQuantity({ [event.target.name]: event.target.value });
  };

  const orderProduct = { ...oneProduct, quantity: quantity.quantity };
  console.log("Product with quantity to add cart:", orderProduct);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(API_BASE_URL + "/product/" + params.id);
      setOneProduct(data);
    }
    getData();
  }, [params]);

  useEffect(() => {
    async function getDataUser() {
      const { data } = await axios.get(API_BASE_URL + "/datauser/" + user._id);
      setDataUser(data);
    }
    getDataUser();
  }, [user]);
  console.log("Cart shop from user:", dataUser);

  const handleAddProduct = (event) => {
    event.preventDefault();
    dataUser.cart.push(orderProduct);
    try {
      async function postProductCart() {
        await axios.put(API_BASE_URL + "/addCart", dataUser);
      }
      postProductCart();
    } catch (error) {
      console.error("Error Post the cart Product", error);
    }
  };

  //   }

  return (
    <div className="singleProduct">
      <h1>{oneProduct.name}</h1>
      <p>{oneProduct.description}</p>
      <img src={oneProduct.productImage} alt={oneProduct.name} />
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
      <button className="buttonsBuono" onClick={handleAddProduct}>
        Add product
      </button>
    </div>
  );
}
