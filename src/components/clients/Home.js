import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

export default function Home() {
  return (
    <div className="layout">
      <div className="home">
        <img className="imgLogo" src={Logo} alt="Buono Gelato" />
        <Link className="buttonsBuono" to={"/login"}>
          Login
        </Link>
        <Link className="link" to={"/signup"}>
          Signup
        </Link>
      </div>
    </div>
  );
}
