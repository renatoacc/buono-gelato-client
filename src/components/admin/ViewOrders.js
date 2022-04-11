import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function ShowOrders() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("");
    // const navigate = useNavigate();
    // const { user, addUserToContext } = useContext(AuthContext); // logout , removeUserFromContext
    // const params = useParams();

    const handleSearch = (event) => {
        setFilter(event.target.value);
      };
    useEffect(() => {
        async function getData() {
          try {
            const { data } = await axios.get(
              API_BASE_URL + "/vieworders" + filter.trim()
            );
            setOrders(data);
          } catch (error) {
            console.error("Search error form api.", error);
          }
        }
        getData();
      }, [filter]);

      return (
        <div>
          <h1>Orders</h1>
          {orders.length === 0 ? (
            <h1> Sorry, we don't orders </h1>
          ) : (
            orders
              .filter((elem) => {
                const search = filter.toLocaleLowerCase();
                return elem.name.toLocaleLowerCase().trim().includes(search.trim());
              })
              .map((elem) => {
                return (
                  <div key={elem._id}>
                  
                    <h1>{elem.clientName}</h1>
                    <p>{elem.products}</p>
                    <p>{elem.checkout}€</p>
    
                  </div>
                  
                );
              })
          )}

                <Link to={"/profile"} className="link">
                <button className="buttonsBuono" type="submit">
                 Back to Profile
                </button>
                </Link>
          <input
            value={filter}
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>
      );
    }
