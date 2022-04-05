import { useState } from "react";

export default function Signup() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    vat: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <div className="layout">
      <h1>Signup</h1>
      <form>
        <label>First Name</label>
        <input name="firstName" type="text" value={user.firstName} />
        <label>Last Name</label>
        <input name="lastName" type="text" value={user.lastName} />
        <label>Address</label>
        <input name="address" type="text" value={user.address} />
        <label>City</label>
        <input name="city" type="text" value={user.city} />
        <label>ZIP Code</label>
        <input name="postcode" type="" value={user.postcode} />
        <label>VAT Number</label>
        <input name="vat" type="number" value={user.tax} />
        <label>Phone Number</label>
        <input name="phone" type="tel" value={user.phone} />
        <label>E-mail</label>
        <input name="email" type="email" value={user.email} />
        <label>Password</label>
        <input name="password" type="password" value={user.password} />
        <label>Confirm Password</label>
        <input
          name="passwordConfirm"
          type="password"
          value={user.passwordConfirm}
        />
      </form>
    </div>
  );
}
