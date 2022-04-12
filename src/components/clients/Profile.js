import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";

export default function Profile() {
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext); // logout , removeUserFromContext
  const [userInfo, setUserInfo] = useState(null);

  async function getUser() {
    const { data } = await axios.get(API_BASE_URL + "/logged");
    if (data) {
      addUserToContext(data);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  useEffect(() => {
    try {
      async function getUserInfo() {
        const { data } = await axios.get(
          API_BASE_URL + "/userInfo/" + user._id
        );
        setUserInfo(data);
      }
      getUserInfo();
    } catch (error) {
      console.log("Error get user information:", error);
    }
  }, []);

  if (userInfo === null) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <div>
        <h3>Name: {userInfo.firstName + " " + userInfo.lastName}</h3>
        <p>
          <b>Address: </b>
          {userInfo.address}
        </p>
        <p>
          <b>City: </b>
          {userInfo.city} <b>PostCode: </b>
          {userInfo.postcode}
        </p>
        <p>
          <b>Vat: </b>
          {userInfo.vat}
        </p>
        <p>
          <b>Phone: </b>
          {userInfo.phone} <b>Email: </b>
          {userInfo.email}
        </p>
      </div>
      <div>
        {userInfo.cart.map((elem) => {
          return <p>{elem.name}</p>;
        })}
      </div>
    </div>
  );
}
