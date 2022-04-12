import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useEffect, useState } from "react";

export default function ListFavorit() {
  const [favorit, setFavorit] = useState(null);
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

  async function listFavorit() {
    try {
      const { data } = await axios.get(
        API_BASE_URL + "/listFavorit/" + user._id
      );
      setFavorit(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handlerRemoveFav = async (event, elem_id) => {
    const deleteResponse = await axios.put(
      API_BASE_URL + "/favoriteRemove/" + elem_id
    );
    const cloneUser = JSON.parse(JSON.stringify(favorit));
    if (deleteResponse) {
      const newFavorite = cloneUser.favourites.filter((elem) => {
        return elem._id !== elem_id;
      });
      cloneUser.favourites = newFavorite;
      setFavorit(cloneUser);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      listFavorit();
    }
  }, [user]);

  if (favorit === null) {
    return <p>Loading</p>;
  }

  return (
    <div className="backPage">
      <h1 className="titleMenu">Favorites</h1>
      {favorit.favourites.map((elem) => {
        return (
          <div key={elem._id} className="foodCard">
            <img
              className="imageProducts"
              src={elem.productImage}
              alt={elem.name}
            />
            <h1>{elem.name}</h1>
            <p className="description">{elem.description}</p>
            <button
              onClick={(event) => {
                handlerRemoveFav(event, elem._id);
              }}
            >
              <box-icon type="solid" color="#133b60" name="heart"></box-icon>
            </button>
          </div>
        );
      })}
      <div className="endPage" />
    </div>
  );
}
