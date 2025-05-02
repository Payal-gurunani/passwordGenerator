import { createContext,useState ,useEffect } from "react";

export const passwordContext = createContext();

export const PasswordProvider  = ({children}) =>{
const [history, setHistory] = useState([]);

useEffect(() =>{
    const saved = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    setHistory(saved)
},[])

useEffect(()=>{
    localStorage.setItem('passwordHistory',JSON.stringify(history))
},[history])

const addPass = (password) =>{
    setHistory(prev => [password , ...prev.slice(0,9)]);
}

return(
    <passwordContext.Provider value={{history,addPass}} >
        {children}
    </passwordContext.Provider >
)
}