import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";
import avatar from "../../assets/img/avatar.png";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "./Carousel";
import "swiper/css/bundle";

export default function Profile() {
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState(null);

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

  useEffect(() => {
    if (!user) {
      getUser();
    }
    listProducts();
  }, [user]);

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

  if (userInfo === null || products === null) {
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
    <div>
      <div className="profileCard">
        <div id="rowNameAvatar">
          <h3 className="p__FromProfile">
            Welcome,
            <br />
            {userInfo.firstName + " " + userInfo.lastName}!
          </h3>
          <img src={avatar} alt="avatar" className="avatar" />
        </div>
        <div>
          <p className="p__FromProfile">
            <b>City: </b>
            {userInfo.city}
          </p>

          <p className="p__FromProfile">
            <b>Email: </b>
            {userInfo.email}
          </p>
        </div>
      </div>
      <div className="carousel">
        <Carousel />
      </div>
    </div>
  );
}
