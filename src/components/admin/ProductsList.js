import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext); // logout , removeUserFromContext

//   async function getUser() {
//     const { data } = await axios.get(API_BASE_URL + "/logged");
//     if (data) {
//       addUserToContext(data);
//     } else {
//       navigate("/login");
//     }
//   }

//   useEffect(() => {
//     if (!user) {
//       getUser();
//     }
//   }, []);

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          API_BASE_URL + "/showproducts" + filter.trim()
        );
        setProducts(data);
      } catch (error) {
        console.error("Search error form api.", error);
      }
    }
    getData();
  }, [filter]);

  useEffect(() => {
    async function listProducts() {
      try {
        const { data } = await axios.get(API_BASE_URL + "/showproducts");
        setProducts(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    listProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <h1>Menu</h1>
      {products.length === 0 ? (
        <h1> Sorry, we don't have this product </h1>
      ) : (
        products
          .filter((elem) => {
            const search = filter.toLocaleLowerCase();
            return elem.name.toLocaleLowerCase().trim().includes(search.trim());
          })
          .map((elem) => {
            return (
              <div key={elem._id}>
                <Link to={"/product/" + elem._id} className="link">
                  <h1>{elem.name}</h1>
                </Link>
                <p>{elem.description}</p>
                <p>{elem.price}€</p>
              </div>
            );
          })
      )}
      <input
        value={filter}
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
}