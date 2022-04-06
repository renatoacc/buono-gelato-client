import logo from "../../assets/img/logo.png";

export default function Login() {
  return (
    <div className="formsPage">
      <img src={logo} alt="Buono Gelato" />
      <h2>Login</h2>
      <form>
        <input name="email" placeholder="email" type="email" value="" />
        <input
          name="password"
          placeholder="password"
          type="password"
          value=""
        />
        <p>teste git</p>
        <button className="buttonsBuono">Login</button>
        <a className="link" href="/signup">
          Signup
        </a>
      </form>
    </div>
  );
}
