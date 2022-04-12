
import axios from "axios";
import { API_BASE_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function CreateProduct(){
 
  const [product, setProduct] = useState({});
  const handleCreateProduct = (event) => {
   
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const [error, setError] = useState();
  
  
  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    let image = event.target.productImage.files[0];
    // console.log(image)
    let imageFormData = new FormData();
    imageFormData.append("productImage", image);
    imageFormData.append("name", product.name);
    imageFormData.append("typeProduct", product.typeProduct);
    imageFormData.append("description", product.description,);
    imageFormData.append("price", product.price,);
    // console.log("formData",imageFormData)
    // const newProduct =
    // {
    //   name:product.name,
    //   typeProduct:product.typeProduct,
    //   price:product.price,
    //   description:product.description,
    //   extraIngredients:product.extraIngredients,
    //   productImage:image,
    // }
   console.log(" NEWPRODUCT" , imageFormData)
    try {
      await axios.post(API_BASE_URL + "/products", imageFormData, {
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
