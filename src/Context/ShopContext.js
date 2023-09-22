// SearchContext.js
import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export function useShop() {
  return useContext(ShopContext);
}

export function ShopProvider({ children }) {
  const [shopname, setShopname] = useState([]);

  return (
    <ShopContext.Provider value={{ shopname, setShopname }}>
      {children}
    </ShopContext.Provider>
  );
}
