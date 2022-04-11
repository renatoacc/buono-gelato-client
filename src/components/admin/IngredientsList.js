import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function ShowIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext); // logout , removeUserFromContext

//   async function getUser() {
//     const { data } = await axios.get(API_BASE_URL + "/logged");
//     if (data) {
//       addUserToContext(data);
//     } else {
//       navigate("/login");
//     }
//   }

//   useEffect(() => {
//     if (!user) {
//       getUser();
//     }
//   }, []);

const handleDeleteIngredients = (e, elem_id) =>{
  e.preventDefault()
  try {  
  async function deleteIngredients(){ 
  await axios.post(API_BASE_URL + "/ingredients/delete/" + elem_id)
  }
  deleteIngredients();
  const filteredingredients = ingredients.filter((elem)=> {return elem._id != elem_id})
  setIngredients(filteredingredients)
  navigate("/showingredients");
  
  } catch (error) {
    console.error("Error in updating ingredients on the server!", error);
  }
};


  const handleSearch = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          API_BASE_URL + "/showingredients" + filter.trim()
        );
        setIngredients(data);
      } catch (error) {
        console.error("Search error form api.", error);
      }
    }
    getData();
  }, [filter]);

  useEffect(() => {
    async function listIngredients() {
      try {
        const { data } = await axios.get(API_BASE_URL + "/showingredients");
        setIngredients(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    listIngredients();
  }, []);
 

  return (
    <div>
      <h1>Ingredients</h1>
      <Link to={"/ingredients"} className="link">
                <button className="buttonsBuono" type="submit">
                 Create New Ingredient
                </button>
                </Link>
      {ingredients.length === 0 ? (
        <h1> Sorry, we don't have this ingredient </h1>
      ) : (
        ingredients
          .filter((elem) => {
            const search = filter.toLocaleLowerCase();
            return elem.name.toLocaleLowerCase().trim().includes(search.trim());
          })
          .map((elem) => {
            return (
              <div key={elem._id}>
              
                <h1>{elem.name}</h1>
                <p>{elem.description}</p>
                <p>{elem.price}€</p>
                <Link to={"/ingredients/" + elem._id} className="link">
                <button className="buttonsBuono" >Edit</button>
                </Link>
              
                <button className="buttonsBuono" onClick={(e)=>{handleDeleteIngredients(e,elem._id)}} >Delete</button>
                
              </div>
            );
          })
      )}
      <input
        value={filter}
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
        }