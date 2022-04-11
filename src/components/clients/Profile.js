import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <Link to={"/shop"}>shop</Link>
      <Link to={"/showproducts"}>Products</Link>
      <Link to={"/products"}>Create products</Link>
      <Link to={"/showingredients"}>Ingredients</Link>
      <Link to={"/ingredients"}>Create ingredients</Link>
    </div>
  );
}
