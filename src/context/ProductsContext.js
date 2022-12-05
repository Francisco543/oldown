import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();
export const useProducts = () => useContext(AppContext);

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  return (
    <AppContext.Provider value={[products, setProducts]}>
      {children}
    </AppContext.Provider>
  );
};

export default ProductsContextProvider;
