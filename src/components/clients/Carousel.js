import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Carousel() {
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext);
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

  if (products === null) {
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
    <div className="warpper">
      <h3 className="titleCarousel">Suggestion</h3>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {products.map((elem) => {
          return (
            <SwiperSlide>
              <div key={elem._id} className="item">
                <img src={elem.productImage} alt={elem.name} />
                <h5 className="imageName">{elem.name}</h5>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
