import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShowOrders() {
  const [orders, setOrders] = useState(null);

  const { admin, addAdminToContext } = useContext(AuthContext); // logout , removeUserFromContext
  const notify = () =>
    toast.success("Your order is ready", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  async function checkAdmin() {
    const { data } = await axios.get(API_BASE_URL + "/admin");
    if (data) {
      addAdminToContext(data);
    } else {
      navigate("/login");
    }
  }

  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext); // logout , removeUserFromContext
  // const params = useParams();
  async function getUser() {
    const { data } = await axios.get(API_BASE_URL + "/logged");
    if (data) {
      addUserToContext(data);
    } else {
      navigate("/login");
    }
  }

  async function listOrders() {
    try {
      const { data } = await axios.get(API_BASE_URL + "/vieworders");
      setOrders(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handlecheckOrder = (e, elem_id) => {
    e.preventDefault();
    try {
      async function checkOrder() {
        await axios.put(API_BASE_URL + "/vieworders/" + elem_id);
      }
      checkOrder();
      const filteredOrders = orders.filter((elem) => {
        return elem._id != elem_id;
      });
      setOrders(filteredOrders);
      navigate("/vieworders");
    } catch (error) {
      console.error("Error in updating the checkout on the server!", error);
    }
  };

  useEffect(() => {
    if (!admin) {
      checkAdmin();
    } else {
      listOrders();
    }
  }, [admin]);

  if (orders === null) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h1>Orders</h1>
      <div className="orderList">
        {orders.length === 0 ? (
          <h1> Sorry, you don't have orders </h1>
        ) : (
          orders.map((elem) => {
            if (elem.checkout === false)
              return (
                <div key={elem._id} className="order">
                  <h1>{elem.clientName} </h1>
                  {elem.products.map((productElement) => {
                    return (
                      <p className="orderInfo" key={productElement._id}>
                        {productElement.name} x {productElement.quantity}
                      </p>
                    );
                  })}
                  <p>{elem.checkout}</p>
                  <button
                    className="buttonsBuono"
                    onClick={(e) => {
                      handlecheckOrder(e, elem._id, notify());
                    }}
                  >
                    checkout
                  </button>
                </div>
              );
          })
        )}
      </div>
      <div className="endPage" />
    </div>
  );
}
