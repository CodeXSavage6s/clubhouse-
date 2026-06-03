import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("user"))
    return saved ? saved : null
  });

  useEffect(() => {
    async function verify() {
    try {
      const response = await fetch("https://clubhouse-backend-aydg.onrender.com/", { credentials: 'include' })
      
      const result = await response.json()
      alert(JSON.stringify(result, null, 2))
      if (!response.ok) { 
        localStorage.removeItem("user")
      }
    } catch(err) {
      alert("error msg: ", err)
    }
    }
    
    verify()
  }, [])

  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUserContext = () => useContext(AuthContext);
