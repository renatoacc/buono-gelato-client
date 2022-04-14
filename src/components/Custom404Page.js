import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import LogoErro from "../assets/img/404Image.png";

export function Custom404Page() {
  return (
    <div className="layoutErroPage">
      <div className="errorPage">
        <img className="logoErroPage" src={logo} alt="buono gelato" />
        <img className="imageErroPage" src={LogoErro} alt="404 Image" />
        <h1>404 - Wrong way!</h1>
        <h2>Your ice cream is melting!!!</h2>
        <Link className="link" to={"/login"}>
          <p>Back</p>
        </Link>
      </div>
    </div>
  );
}
