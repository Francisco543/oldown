import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();
export const useAlert = () => useContext(AppContext);

const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: "" });
  return (
    <AppContext.Provider value={[alert, setAlert]}>
      {children}
    </AppContext.Provider>
  );
};

export default AlertContextProvider;
