import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";

export default function Cart() {
  const [shoppingCart, setShoppingCart] = useState(null);
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

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      getCart();
    }
  }, [user]);

  const handleCreateOrder = (event) => {
    try {
      async function postCreateOrder() {
        await axios.post(API_BASE_URL + "/order", shoppingCart);
        await axios.put(API_BASE_URL + "/deleteCart/" + user._id);
        navigate("/profile");
        console.log("order success!");
      }
      postCreateOrder();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (e, elem_id, index) => {
    try {
      const userIdAndElemId = [user._id, elem_id, index];
      async function deleteElementCart() {
        await axios.put(API_BASE_URL + "/cartDeleteElement/", userIdAndElemId);
        getCart();
        console.log("Delete success!");
      }
      deleteElementCart();
    } catch (error) {
      console.error("Error delete the product!", error);
    }
  };

  console.log("Data form database, user cart:", shoppingCart);

  return (
    <div>
      <h1>Cart</h1>
      <table>
        <tr>
          <th>Quantity</th>
          <th>Product</th>
          <th>Price</th>
          <th>Total</th>
          <th></th>
        </tr>
        {shoppingCart &&
          shoppingCart.cart.map((elem, index) => (
            <tr key={elem._id}>
              <td>{elem.quantity}</td>
              <td>{elem.name}</td>
              <td>{elem.price}€</td>
              <td>{elem.price * elem.quantity}€</td>
              <td>
                <button
                  className="buttonsBuono"
                  onClick={(e) => {
                    handleDelete(e, elem._id, index);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
      </table>
      <button className="buttonsBuono" onClick={handleCreateOrder}>
        Order
      </button>
    </div>
  );
}
