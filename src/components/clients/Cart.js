import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";

export default function Cart() {
  const [shoppingCart, setShoppingCart] = useState(null);
  const [numberOrderArray, setNumberOrderArray] = useState([
    ...Array(100).keys(),
  ]);
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

  async function getCart() {
    const { data } = await axios.get(API_BASE_URL + "/cart" + user._id);
    setShoppingCart(data);
  }

  async function numberOrder() {
    const data = await axios.get(API_BASE_URL + "/number/order");
    const newArray = numberOrderArray.splice(0, data.length);
    setNumberOrderArray(newArray);
  }

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      getCart();
      numberOrder();
    }
  }, [user]);

  console.log("ORDER NUMBER ARRAY: ", numberOrderArray);
  console.log("Data form database, user cart:", shoppingCart);

  return (
    <div>
      <h1>Cart</h1>
      <table>
        <tr>
          <th>Quantity</th>
          <th>Product</th>
          <th>Price/uni</th>
          <th>Total</th>
        </tr>
        {shoppingCart &&
          shoppingCart.cart.map((elem) => (
            <tr key={elem._id}>
              <td>{elem.quantity}</td>
              <td>{elem.name}</td>
              <td>{elem.price}€</td>
              <td>{elem.price * elem.quantity}€</td>
            </tr>
          ))}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <button className="buttonsBuono">Order</button>
    </div>
  );
}
