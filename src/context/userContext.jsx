import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);


  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUserContext = () => useContext(AuthContext);
