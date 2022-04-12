import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const[admin, setAdmin] = useState(null);

  const addUserToContext = (newUser) => {
    if (user !== null) return;
    console.log(newUser);
    setUser(newUser);
  };

  const removeUserFromContext = () => {
    setUser(null);
  };

  const addAdminToContext =(newAdmin) =>{
    if(admin!== null) return;
    setAdmin(newAdmin);
  };

  const removeAdminFromContext = () => {
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, addUserToContext, removeUserFromContext, admin, addAdminToContext, removeAdminFromContext  }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
