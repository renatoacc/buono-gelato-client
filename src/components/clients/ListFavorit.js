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
    console.log(elem_id);
    await axios.put(API_BASE_URL + "/favoriteRemove/" + elem_id);
    listFavorit();
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
  console.log(favorit);
  return (
    <div>
      <h1>Favorit List</h1>
      {favorit.favourites.map((elem) => {
        return (
          <div key={elem._id}>
            {/* <img></img> */}
            <h1>{elem.name}</h1>
            <p>{elem.description}</p>
            <button
              onClick={(event) => {
                handlerRemoveFav(event, elem._id);
              }}
            >
              remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
