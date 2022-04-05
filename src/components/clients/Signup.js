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
  });

const [passwordError, setPasswordErr] = useState("");
const [confirmPasswordError, setConfirmPasswordError] = useState("");
const [passwordInput, setPasswordInput]= useState({
    password:'',
    confirmPassword:''
})
const handlePasswordChange =(event)=>{
  const passwordInputValue = event.target.value.trim();
  const passwordInputFieldName = event.target.name;
  const NewPasswordInput = {...passwordInput,[passwordInputFieldName]:passwordInputValue}
  setPasswordInput(NewPasswordInput);
  
}
const handleValidation= (event)=>{
  const passwordInputValue = event.target.value.trim();
  const passwordInputFieldName = event.target.name;
      //for password 
if(passwordInputFieldName==='password'){
  const uppercaseRegExp   = /(?=.*?[A-Z])/;
  const lowercaseRegExp   = /(?=.*?[a-z])/;
  const digitsRegExp      = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp   = /.{8,}/;
  const passwordLength =      passwordInputValue.length;
  const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
  const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
  const digitsPassword =      digitsRegExp.test(passwordInputValue);
  const specialCharPassword = specialCharRegExp.test(passwordInputValue);
  const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
  let errMsg ="";
  if(passwordLength===0){
          errMsg="Password is empty";
  }else if(!uppercasePassword){
          errMsg="At least one Uppercase";
  }else if(!lowercasePassword){
          errMsg="At least one Lowercase";
  }else if(!digitsPassword){
          errMsg="At least one digit";
  }else if(!specialCharPassword){
          errMsg="At least one Special Characters";
  }else if(!minLengthPassword){
          errMsg="At least minumum 8 characters";
  }else{
      errMsg="";
  }
  setPasswordErr(errMsg);
  }
  // for confirm password
  if(passwordInputFieldName=== "confirmPassword" || (passwordInputFieldName==="password" && passwordInput.confirmPassword.length>0) ){
          
      if(passwordInput.confirmPassword!==passwordInput.password)
      {
      setConfirmPasswordError("Confirm password is not matched");
      }else{
      setConfirmPasswordError("");
      }
      
  }
} 

  const handleUserState = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className="layout">
      <h1>Signup</h1>
      <form >
        <input name="firstName" type="text" value={user.firstName} placeholder="First Name" onChange={handleUserState}  />
        <input name="lastName" type="text" value={user.lastName} placeholder="Last Name" onChange={handleUserState} />
        <input name="address" type="text" value={user.address} placeholder="Address" onChange={handleUserState} />
        <input name="city" type="text" value={user.city} placeholder="City" onChange={handleUserState} />
        <input name="postcode" type="" value={user.postcode} placeholder="ZIP Code" onChange={handleUserState} />
        <input name="vat" type="number" value={user.tax} placeholder="VAT Number" onChange={handleUserState} />
        <input name="phone" type="tel" value={user.phone} placeholder="Phone Number" onChange={handleUserState} />
        <input name="email" type="email" value={user.email} placeholder="E-mail" onChange={handleUserState} />
        <input name="password" type="password" value={passwordInput.password} placeholder="Password" onChange={handlePasswordChange} onKeyUp={handleValidation}  /> 
        
        <input
          name="confirmPassword"
          type="password"
          value={passwordInput.confirmPassword}
          placeholder="Confirm Password"
          onChange={handlePasswordChange}
          onKeyUp={handleValidation}
        />
        <p className="text-danger">{passwordError}</p>
        <p className="text-danger">{confirmPasswordError}</p>

      </form>
    </div>
  );
}
