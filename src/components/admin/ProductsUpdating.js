import axios from "axios";
import { API_BASE_URL } from "../../consts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UpdateProduct(){
    const params = useParams();
  const [product, setProduct] = useState({});

  const handleUpdateProduct = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const [error, setError] = useState();

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(API_BASE_URL + "/products/" + params.id);
      setProduct(data);
    }
    getData();
  }, [params]);
  
  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    const  afterUpdateProduct = { ...product,[event.target.name]: event.target.value  };
    console.log(afterUpdateProduct)
    try {
    await axios.put(API_BASE_URL + "/products/" + params.id, afterUpdateProduct);
      navigate("/showproducts");
    } catch (erro) {
      setError({ message: error.response.data.errorMessage });
    }
  };

    return(
      <>
    
      <h1>Update Product</h1>
      <form onSubmit={handleSubmitProduct}>
      <input
        name="name"
        type="text"
        value={product.name}
        placeholder="Product Name"
        onChange={handleUpdateProduct}
      />
      <input
        name="typeProduct"
        type="text"
        value={product.typeProduct}
        placeholder="Type of the product"
        onChange={handleUpdateProduct}
      />
      <input
        name="description"
        type="text"
        value={product.description}
        placeholder="Description"
        onChange={handleUpdateProduct}
      />
      <input
        name="price"
        type="number"
        value={product.price}
        placeholder="Price"
        onChange={handleUpdateProduct}
      />
   
   
      <button className="buttonsBuono" type="submit">
        Update
      </button>
      </form>
      <Link to={"/showproducts"} className="link">
                <button className="buttonsBuono" type="submit">
               Back
                </button>
                </Link>
      </>
    )
}
