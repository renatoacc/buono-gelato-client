import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";

export default function Cart() {
  const [shoppingCart, setShoppingCart] = useState({});
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

  useEffect(() => {
    async function getCart() {
      const { data } = await axios.get(API_BASE_URL + "/cart/" + user._id);
      setShoppingCart(data);
    }
    getCart();
  }, []);

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
        {shoppingCart.cart.map((elem) => {
          return (
            <>
              <tr>
                <td>{elem.quantity}</td>
                <td>{elem.name}</td>
                <td>{elem.price}€</td>
                <td>{elem.price * elem.quantity}€</td>
              </tr>
            </>
          );
        })}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}
