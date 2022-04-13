import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export function ShoppingCartProvider(props) {
  const [shoppingCart, setShoppingCart] = useState(null);



  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
}
