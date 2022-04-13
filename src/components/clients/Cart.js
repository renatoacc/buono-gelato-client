import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";

import { ShoppingCartContext } from "../../context/ShoppingCartProvider";

export default function Cart() {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext);

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
    console.log(data);
    setShoppingCart(data.cart);
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
      if (shoppingCart.length > 0) {
        async function postCreateOrder() {
          await axios.post(API_BASE_URL + "/order", {
            ...user,
            cart: shoppingCart,
          });

          await axios.put(API_BASE_URL + "/deleteCart/" + user._id);
          getCart();
          navigate("/profile");
        }
        postCreateOrder();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (e, index) => {
    try {
      async function deleteElementCart() {
        await axios.put(API_BASE_URL + "/cartDeleteElement/", { index });
        getCart();
      }
      deleteElementCart();
    } catch (error) {
      console.error("Error delete the product!", error);
    }
  };

  if (shoppingCart === null) {
    return (
      <box-icon
        name="loader-alt"
        animation="spin"
        flip="horizontal"
        color="#133b60"
      ></box-icon>
    );
  }

  return (
    <div className="foodCard">
      <h1 className="titleMenu">Cart</h1>

      <table>
        {shoppingCart != 0 ? (
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th colspan="2">Total</th>
            <th></th>
          </tr>
        ) : (
          <h3>Your cart is empty</h3>
        )}
        {shoppingCart.map((elem, index) => (
          <tr key={elem._id + index}>
            <td>{elem.quantity}</td>
            <td>{elem.name}</td>
            <td colspan="2">{elem.price * elem.quantity}€</td>
            <td>
              <button
                className="buttonsBuono"
                onClick={(e) => {
                  handleDelete(e, index);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </table>

      {shoppingCart != 0 ? (
        <button className="buttonsBuono" onClick={handleCreateOrder}>
          Order
        </button>
      ) : null}
      <div className="endPage" />
    </div>
  );
}
