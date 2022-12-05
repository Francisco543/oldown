import React, { createContext, useContext, useState } from 'react'


export const AppContext = createContext();
export const useWidgetCartContext = () => useContext(AppContext);

const WidgetCartContextProvider = ({ children }) => {
    const [widgetCounter, setWidgetCounter] = useState(0)
  return (
    <AppContext.Provider value={[widgetCounter, setWidgetCounter]}>
        {children}
    </AppContext.Provider>
  )
}

export default WidgetCartContextProvider