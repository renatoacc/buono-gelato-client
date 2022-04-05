import Logo from "../../assets/img/logo.png";

export default function Home() {
  return (
    <div className="layout">
      <img className="imgLogo" src={Logo} alt="Buono Gelato" />
      <button className="buttonsBuono">Login</button>
      <a id="signupLink" href="/signup">
        Signup
      </a>
    </div>
  );
}
