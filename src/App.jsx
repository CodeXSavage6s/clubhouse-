import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import '../styles/style.css'
import '../styles/another.css'
import UserProvider from './context/userContext.jsx'
import SocketProvider from './context/socketContext.jsx'
import ThemeProvider from './context/themeContext.jsx'
const router = createBrowserRouter(routes)

function App() {

  return (
    <div className="overflow-hidden h-[100vh]">
    <ThemeProvider>
      <SocketProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </SocketProvider>
    </ThemeProvider>
    </div>
  )
}

export default App
