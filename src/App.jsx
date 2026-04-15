import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import '../public/style.css'
import '../public/another.css'
import UserProvider from './context/userContext.jsx'
import SocketProvider from './context/socketContext.jsx'
const router = createBrowserRouter(routes)

function App() {

  return (
    <div className="overflow-hidden h-[100vh]">
    <SocketProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SocketProvider>
    </div>
  )
}

export default App
