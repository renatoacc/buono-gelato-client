import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";
import backArrow from "../../assets/img/PngItem_2022960.png";
import { ShoppingCartContext } from "../../context/ShoppingCartProvider";

export default function Product() {
  const params = useParams();
  const [dataUser, setDataUser] = useState({});
  const [oneProduct, setOneProduct] = useState({});
  const [quantity, setQuantity] = useState({ quantity: "1" });
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext);
  const { setShoppingCart } = useContext(ShoppingCartContext);

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

  const orderProduct = { ...oneProduct, quantity: Number(quantity.quantity) };

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

  const handleAddProduct = (event) => {
    event.preventDefault();
    try {
      async function postProductCart() {
        await axios.post(API_BASE_URL + "/addCart", orderProduct);
        setShoppingCart((oldCart) => {
          return [...(oldCart || []), orderProduct];
        });
        navigate("/product/" + params.id);
      }
      postProductCart();
    } catch (error) {
      console.error("Error Post the cart Product", error);
    }
  };

  return (
    <div className="foodCard">
      <Link to="/shop" className="buttonBack">
        <img src={backArrow} alt="back" />
      </Link>
      <img
        className="imageProducts"
        src={oneProduct.productImage}
        alt={oneProduct.name}
      />
      <h1 className="titleMenu">{oneProduct.name}</h1>
      <p className="description">{oneProduct.description}</p>
      <p className="priceCard">{oneProduct.price}€</p>
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
