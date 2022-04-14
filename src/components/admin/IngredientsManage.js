import axios from "axios";
import { API_BASE_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function CreateIngredient() {
  const { admin, addAdminToContext } = useContext(AuthContext); // logout , removeUserFromContext

  async function checkAdmin() {
    const { data } = await axios.get(API_BASE_URL + "/admin");
    if (data) {
      addAdminToContext(data);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!admin) {
      checkAdmin();
    }
  }, []);

  const [ingredient, setIngredient] = useState({});

  const handleCreateProduct = (event) => {
    setIngredient({ ...ingredient, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    const newIngredient = {
      ...ingredient,
      [event.target.name]: event.target.value,
    };
    console.log(newIngredient);
    try {
      await axios.post(API_BASE_URL + "/ingredients", newIngredient);
      navigate("/showingredients");
    } catch (error) {
      setError({ message: error.response.data.errorMessage });
    }
  };

  return (
    <div className="formsPage">
      <h1>Create new Ingredient</h1>
      <form onSubmit={handleSubmitProduct}>
        <input
          name="name"
          type="text"
          value={ingredient.name}
          placeholder="Name"
          onChange={handleCreateProduct}
        />
        <select name="typeIngredient" id="typeIngredient">
          <option value={(ingredient.typeIngredient = "Topping")}>
            Topping
          </option>
          <option value={(ingredient.typeIngredient = "Ice-Cream")}>
            Ice-Cream
          </option>
          <option value={(ingredient.typeIngredient = "Crunchy")}>
            Crunchy
          </option>
        </select>

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

        <button className="buttonsBuono" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
