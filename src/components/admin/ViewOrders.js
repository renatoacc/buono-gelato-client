import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function ShowOrders() {
    const [orders, setOrders] = useState([]);
 
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


    useEffect(() => {
      if (!user) {
        getUser();
      } else{
        listOrders();
      }
    }, [user]);
    console.log(orders)
    // const handleSearch = (event) => {
    //     setFilter(event.target.value);
   
   

      return (
        <div>
          <h1>Orders</h1>
          {orders.length === 0 ? (
            <h1> Sorry, you don't have orders </h1>
          ) : (
            orders
              .map((elem) => {
                if(elem.checkout === false)
                return ( 
                  <div key={elem._id}>
                    <h1>{elem.clientName}</h1>
                   {elem.products.map((productElement)=>{
                     return(<p key={productElement._id}>{productElement.name} x {productElement.quantity}</p>) 
                   })}
                    <p>{elem.checkout}</p>
                    <button className="buttonsBuono" onClick={()=>elem.checkout = true}>checkout</button>
                  </div> 
                );
                
              })
          )}
          
        </div>
      );
    }
