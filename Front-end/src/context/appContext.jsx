import { useContext, useState } from "react";
import { createContext } from "react";

const AppContext = createContext()
export const AppProvider = ({children}) =>{
      const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
      const [posts,setposts] = useState([])
      const [post,setPost] = useState("")
      const value = {user,setUser,posts,setposts,post,setPost}
      return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
      )
}
export const useAppContext = () => useContext(AppContext)