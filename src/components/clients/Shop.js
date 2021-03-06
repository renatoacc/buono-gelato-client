import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext); // logout , removeUserFromContext
  let isFavorite = false;

  async function getUser() {
    const { data } = await axios.get(API_BASE_URL + "/logged");
    if (data) {
      addUserToContext(data);
    } else {
      navigate("/login");
    }
  }

  async function userDataAxios() {
    try {
      const { data } = await axios.get(API_BASE_URL + "/userInfo/" + user._id);
      setUserData(data);
    } catch (error) {
      console.error(error);
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
    async function addFavorit(elem) {
      const updateUser = await axios.put(API_BASE_URL + "/favoritAdd", elem);
      setUserData(updateUser.data);
      listProducts();
    }
    addFavorit(elem);
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      listProducts();
      userDataAxios();
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

  if (!products || !userData) {
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
    <div className="backPage">
      <h1 className="titleMenu">Menu</h1>
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
              <div key={elem._id} className="foodCard">
                <Link to={"/product/" + elem._id}>
                  <img
                    className="imageProducts"
                    src={elem.productImage}
                    alt={elem.name}
                  />
                </Link>
                <Link to={"/product/" + elem._id} className="link">
                  <h1>{elem.name}</h1>
                </Link>
                <p className="priceCard">
                  <b>{elem.price}???</b>
                </p>
                <button
                  onClick={(event) => {
                    handleAddFavorit(event, elem);
                  }}
                >
                  {(isFavorite = false)}
                  {userData.favourites &&
                    userData.favourites.forEach((element) => {
                      if (element._id == elem._id) {
                        isFavorite = true;
                      }
                    })}
                  {userData.favourites && isFavorite ? (
                    <box-icon
                      name="heart"
                      type="solid"
                      color="#133b60"
                    ></box-icon>
                  ) : (
                    <box-icon name="heart" color="#133b60"></box-icon>
                  )}
                </button>
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
