import axios from "axios";
import { API_BASE_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


export default function CreateIngredient(){
    
    const [ingredient, setIngredient] = useState({});
  
    const handleCreateProduct = (event) => {
      setIngredient({ ...ingredient, [event.target.name]: event.target.value });
    };
    const navigate = useNavigate();
    const [error, setError] = useState();
  
    const handleSubmitProduct = async (event) => {
      event.preventDefault();
      const newProduct = { ...ingredient,[event.target.name]: event.target.value  };
      console.log(newProduct)
      try {
        await axios.post(API_BASE_URL + "/ingredients", newProduct);
        navigate("/showingredients");
      } catch (error) {
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
          value={ingredient.name}
          placeholder="Name"
          onChange={handleCreateProduct}
        />
        <input
          name="typeProduct"
          type="text"
          value={ingredient.typeProduct}
          placeholder="Type of the ingredient"
          onChange={handleCreateProduct}
        />
        <input
          name="description"
          type="text"
          value={ingredient.description}
          placeholder="Description"
          onChange={handleCreateProduct}
        />
        <input
          name="price"
          type="number"
          value={ingredient.price}
          placeholder="Price"
          onChange={handleCreateProduct}
        />
         {/* <input
          name="productImage"
          type="file"
          value={ingredient.productImage}
          placeholder="Image"
          onChange={upload}
  
        /> */}
         {/* <Upload value={ingredient.productImage}/> */}
        
        <button className="buttonsBuono" type="submit">
          Create
        </button>
        </form>
        </>
      )
  }
  