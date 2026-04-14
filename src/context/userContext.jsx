import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });


  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Exporting as a custom hook for better usability
export const useUserContext = () => useContext(AuthContext);
