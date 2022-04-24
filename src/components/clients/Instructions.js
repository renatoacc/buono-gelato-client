import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

export default function Instructions() {
  return (
    <div className="layout">
      <div className="home">
        <img className="imgLogo" src={Logo} alt="Buono Gelato" />
        <h1>Instructions</h1>
        <p>
          This app is only a demo app. You never order these products from this
          company. Please if you want try to use this login to be easier to
          experiment with. Admin: testadmin@email.com Password: Qwerty-0987 and
          for your test like a consumer Client: testclient@email.com Password:
          Qwerty-0987. This project was made by Renato Costa and Andre Costa,
          students of the Wed Developer bootcamp at Ironhack. This App was made
          for the final project.
        </p>

        <Link className="buttonsBuono" to={"/login"}>
          Login
        </Link>
        <Link className="link" to={"/signup"}>
          Signup
        </Link>
        <Link className="link" to={"/instructions"}>
          Instructions
        </Link>
      </div>
    </div>
  );
}
