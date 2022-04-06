import Logo from "../../assets/img/logo.png";

export default function Home() {
  return (
    <div className="layout">
      <img className="imgLogo" src={Logo} alt="Buono Gelato" />
      <a className="buttonsBuono" href="/login">Login</a>
      <a className="link" href="/signup">
        Signup
      </a>
    </div>
  );
}
