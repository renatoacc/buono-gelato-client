import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
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

  async function listProducts() {
    try {
      const { data } = await axios.get(API_BASE_URL + "/shop");
      setProducts(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  const handleAddFavorit = (event, elem) => {
    event.preventDefault();
    async function addFavorit(elem) {
      await axios.put(API_BASE_URL + "/favoritAdd", elem);
    }
    addFavorit(elem);
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      listProducts();
    }
  }, [user]);

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          API_BASE_URL + "/shop" + filter.trim()
        );
        setProducts(data);
      } catch (error) {
        console.error("Search error form api.", error);
      }
    }
    getData();
  }, [filter]);

  if (products === null) {
    return <box-icon name="loader-alt"></box-icon>;
  }

  return (
    <div className="backPage">
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
                <img src={elem.productImage} alt={elem.name} />
                <Link to={"/product/" + elem._id} className="link">
                  <h1>{elem.name}</h1>
                </Link>
                <button
                  onClick={(event) => {
                    handleAddFavorit(event, elem);
                  }}
                >
                  <box-icon name="heart"></box-icon>
                </button>
                <p>{elem.description}</p>
                <p>{elem.price}€</p>
              </div>
            );
          })
      )}
      <input
        className="quantity"
        value={filter}
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
      <div className="endPage" />
    </div>
  );
}
