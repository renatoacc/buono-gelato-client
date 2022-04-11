import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { user, addUserToContext } = useContext(AuthContext); // logout , removeUserFromContext
  const params = useParams();
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


const handleDeleteProduct = (e, elem_id) =>{
        e.preventDefault()
        try {  
        async function deleteProduct(){ 
        await axios.post(API_BASE_URL + "/products/delete/" + elem_id)
        }
        deleteProduct();
        const filteredProducts = products.filter((elem)=> {return elem._id != elem_id})
        setProducts(filteredProducts)
        navigate("/showproducts");
        
        } catch (error) {
          console.error("Error in updating the todo on the server!", error);
        }
      };
     

// const deleteProduct = async (event) => {
//     try {
//      await axios.post(API_BASE_URL + "/products/delete/" + params.id)
//      //navigate("/showproducts");
//     } catch (error) {
//       console.error("Error in updating the todo on the server!", error);
//     }
//   };

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          API_BASE_URL + "/showproducts" + filter.trim()
        );
        setProducts(data);
      } catch (error) {
        console.error("Search error form api.", error);
      }
    }
    getData();
  }, [filter,params]);

  useEffect(() => {
    async function listProducts() {
      try {
        const { data } = await axios.get(API_BASE_URL + "/showproducts");
        setProducts(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    listProducts();
  }, []);
 
  return (
    <div>
      <h1>Products</h1>
      <Link to={"/products"} className="link">
                <button className="buttonsBuono" type="submit">
                 Create New Product
                </button>
                </Link>
      {products.length === 0 ? (
        <h1> Sorry, we don't have this product </h1>
      ) : (
        products
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

                <Link to={"/products/" + elem._id} className="link">
                <button className="buttonsBuono" type="submit">
                 Edit
                </button>
                </Link>
                <button className="buttonsBuono" onClick={(e)=>{handleDeleteProduct(e,elem._id)}}>
                 Delete
                </button>
                {/* </Link> */}
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