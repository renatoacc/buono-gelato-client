import { API_BASE_URL } from "../../consts";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function listProducts() {
      try {
        const { data } = await axios.get(API_BASE_URL + "/shop");
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
      {products.map((elem) => {
        return (
          <div key={elem._id}>
            <a href={elem._id}>
              <h1>{elem.name}</h1>
            </a>
            <h3>{elem.typeProduct}</h3>
            <p>{elem.price}€</p>
          </div>
        );
      })}
    </div>
  );
}
