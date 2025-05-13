import { createContext,useState ,useEffect } from "react";

export const passwordContext = createContext();

export const PasswordProvider  = ({children}) =>{
const [history, setHistory] = useState([]);


useEffect(() =>{
    const saved = JSON.parse(localStorage.getItem('passwordHistory')) || [];
     if (saved) {
      setHistory(saved);
    }
},[])

useEffect(()=>{
 if (history.length > 0) {
      localStorage.setItem('passwordHistory', JSON.stringify(history));
    }
},[history])

const addPass = (newPassword) => {
  setHistory(prev => {
    const updated = [newPassword, ...prev];
    localStorage.setItem('passwordHistory', JSON.stringify(updated));
    return updated;
  });
};


return(
    <passwordContext.Provider value={{history,addPass,setHistory}} >
        {children}
    </passwordContext.Provider >
)
}