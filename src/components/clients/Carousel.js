import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../consts";
import { AuthContext } from "../../context/AuthProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((elem) => {
          return (
            <SwiperSlide>
              <Link to={"/product/" + elem._id}>
                <div key={elem._id} className="item">
                  <img src={elem.productImage} alt={elem.name} />
                  <h5 className="imageName">{elem.name}</h5>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
