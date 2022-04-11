
import axios from "axios";
import { API_BASE_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function CreateProduct(){
  
  const [product, setProduct] = useState({});
  const handleCreateProduct = (event) => {
    // let image = event.target.product.files[0];
    // let imageFormData = new FormData();
    // imageFormData.append("productImage", image);
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const [error, setError] = useState();
  
  
  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    let image = event.target.productImage.files[0];
    console.log(image)
    let imageFormData = new FormData();
    imageFormData.append("productImage", image);
    console.log("formData",imageFormData)
    const newProduct = { ...product,[event.target.name]: event.target.value};
  
    try {
      await axios.post(API_BASE_URL + "/products", newProduct, imageFormData, {
        withCredentials: true,
      });
      navigate("/showproducts");
    } catch (error) {
      setError({ message: error.response.data.errorMessage });
    }
  };

    return(
      <>
      <h1>Create new Product</h1>
      <form  onSubmit={handleSubmitProduct} method="POST" enctype="multipart/form-data">
      <input
        name="name"
        type="text"
        value={product.name}
        placeholder="Name"
        onChange={handleCreateProduct}
      />
     <select name="typeProduct" id="typeProduct">
        <option value={product.typeProduct = "Crepe"}>Crepe</option>
        <option value={product.typeProduct = "Waffle"}>Waffle</option>
        <option value={product.typeProduct = "Bubble Waffle"}>Bubble Waffle</option>
        </select>
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
      <input type="file" name="productImage" />

      <button className="buttonsBuono" type="submit">
        Create
      </button>
      </form>
    
      </>
    )
}
