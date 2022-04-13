import axios from "axios";
import { API_BASE_URL } from "../../consts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function UpdateProduct(){
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
    let image = event.target.productImage.files[0];
    // console.log(image)
    let imageFormData = new FormData();
    imageFormData.append("productImage", image);
    imageFormData.append("name", product.name);
    imageFormData.append("typeProduct", product.typeProduct);
    imageFormData.append("description", product.description,);
    imageFormData.append("price", product.price,);

    try {
    await axios.put(API_BASE_URL + "/products/" + params.id, imageFormData, {
      withCredentials: true,
    });
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
        onChange={handleUpdateProduct}
      />
      <input
        name="price"
        type="number"
        value={product.price}
        placeholder="Price"
        onChange={handleUpdateProduct}
      />
      <input type="file" name="productImage" />
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
