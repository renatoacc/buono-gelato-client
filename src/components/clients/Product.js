import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../consts";

export default function Product() {
  const params = useParams();
  const [oneProduct, setOneProduct] = useState({});
  console.log(params);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(API_BASE_URL + "/product" + params._id);
      setOneProduct(data);
    }
    getData();
  }, [params]);

  return (
    <div>
      <h1>{oneProduct.name}</h1>
    </div>
  );
}
