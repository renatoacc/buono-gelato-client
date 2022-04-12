import { API_BASE_URL } from "../../consts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function ShowProducts() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

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


  const handleDeleteProduct = (e, elem_id) => {
    e.preventDefault();
    try {
      async function deleteProduct() {
        await axios.post(API_BASE_URL + "/products/delete/" + elem_id);
      }
      deleteProduct();
      const filteredProducts = products.filter((elem) => {
        return elem._id != elem_id;
      });
      setProducts(filteredProducts);
      navigate("/showproducts");
    } catch (error) {
      console.error("Error in updating the todo on the server!", error);
    }
  };

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
  }, [filter]);

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
                <img src={elem.productImage} alt={elem.name}></img>
                <p>{elem.description}</p>
                <p>{elem.price}€</p>

                <Link to={"/products/" + elem._id} className="link">
                  <button className="buttonsBuono" type="submit">
                    Edit
                  </button>
                </Link>
                <button
                  className="buttonsBuono"
                  onClick={(e) => {
                    handleDeleteProduct(e, elem._id);
                  }}
                >
                  Delete
                </button>
                {/* </Link> */}
              </div>
            );
          })
      )}
      <input
        className="quantity"
        value={filter}
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
      <div className="endPage" />
    </div>
  );
}
