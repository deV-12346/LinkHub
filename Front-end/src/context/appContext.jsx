import { useContext } from "react";
import { createContext } from "react";

const appContext = createContext()
export const AppProvider = ({children}) =>{
      const name = "Anku"
      const value = {name}
      return(
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
      )
}
export const useAppContext = () => useContext(appContext)