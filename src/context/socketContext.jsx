import { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client'

const SocketContext = createContext(null)

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState()
  const [connected, setConnected] = useState(false)
  
  useEffect (() => {
    const newSocket = io("https://clubhouse-backend-aydg.onrender.com", {withCredentials: true})
    setSocket(newSocket)
    
    newSocket.on('connect', () => setConnected(true));
    newSocket.on('disconnect', () => setConnected(false));
    
    return () => {
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.disconnect()
    }
  }, [])
  
    return (
      <SocketContext.Provider value={{ socket, connected, setConnected }}>
        {children}
      </SocketContext.Provider>
      )
}

export const useSocketContext = () => useContext(SocketContext)