import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();
export const useMyContext = () => useContext(AppContext);

const CartContextProvider = ({ children }) => {
  const [state, setState] = useState([]);
  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export default CartContextProvider;
