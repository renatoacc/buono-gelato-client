import { createContext, useState } from "react";

export const CountryContext = createContext();

export function CountryProvider(props) {
  const [country, setCountry] = useState("EN");

  const toggleCountry = () => {
    if (country === "EN") {
      setCountry("PT");
    } else {
      setCountry("EN");
    }
  };

  return (
    <CountryContext.Provider value={{ country, toggleCountry }}>
      {props.children}
    </CountryContext.Provider>
  );
}
