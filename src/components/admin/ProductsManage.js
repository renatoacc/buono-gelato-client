
import axios from "axios";
import { API_BASE_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { upload } from "@testing-library/user-event/dist/upload";
import Upload from "./UploadImage";




export default function CreateProduct(){
    
  const [product, setProduct] = useState({});

  const handleCreateProduct = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    const newProduct = { ...product,[event.target.name]: event.target.value  };
    console.log(newProduct)
    try {
      await axios.post(API_BASE_URL + "/products", newProduct);
      navigate("/showproducts");
    } catch (erro) {
      setError({ message: error.response.data.errorMessage });
    }
  };

    return(
      <>
      <h1>Create new Product</h1>
      <form onSubmit={handleSubmitProduct}>
      <input
        name="name"
        type="text"
        value={product.name}
        placeholder="Name"
        onChange={handleCreateProduct}
      />
      <input
        name="typeProduct"
        type="text"
        value={product.typeProduct}
        placeholder="Type of the product"
        onChange={handleCreateProduct}
      />
      <input
        name="description"
        type="text"
        value={product.description}
        placeholder="Description"
        onChange={handleCreateProduct}
      />
      <input
        name="price"
        type="number"
        value={product.price}
        placeholder="Price"
        onChange={handleCreateProduct}
      />
       {/* <input
        name="productImage"
        type="file"
        value={product.productImage}
        placeholder="Image"
        onChange={upload}

      /> */}
       {/* <Upload value={product.productImage}/> */}
      
      <button className="buttonsBuono" type="submit">
        Create
      </button>
      </form>
      </>
    )
}
