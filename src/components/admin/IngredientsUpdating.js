import axios from "axios";
import { API_BASE_URL } from "../../consts";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function UpdateIngredient(){
    const params = useParams();
  const [ingredient, setIngredient] = useState({});

  const handleUpdateIngredient = (event) => {
    setIngredient({ ...ingredient, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const [error, setError] = useState();

  
  const handleSubmitIngredient = async (event) => {
    event.preventDefault();
    const  afterUpdateIngredient = { ...ingredient,[event.target.name]: event.target.value  };
    console.log(afterUpdateIngredient)
    try {
    await axios.put(API_BASE_URL + "/ingredients/" + params.id, afterUpdateIngredient);
      navigate("/showingredients");
    } catch (error) {
      setError({ message: error.response.data.errorMessage });
    }
  };

    return(
      <>
      <h1>Update Ingredient</h1>
      <form onSubmit={handleSubmitIngredient}>
      <input
        name="name"
        type="text"
        value={ingredient.name}
        placeholder={ingredient.name}
        onChange={handleUpdateIngredient}
      />
      <input
        name="typeIngredient"
        type="text"
        value={ingredient.typeIngredient}
        placeholder="Type of the ingredient"
        onChange={handleUpdateIngredient}
      />
      <input
        name="description"
        type="text"
        value={ingredient.description}
        placeholder="Description"
        onChange={handleUpdateIngredient}
      />
      <input
        name="price"
        type="number"
        value={ingredient.price}
        placeholder="Price"
        onChange={handleUpdateIngredient}
      />
   
   
      <button className="buttonsBuono" type="submit">
        Update
      </button>
      </form>
      </>
    )
}