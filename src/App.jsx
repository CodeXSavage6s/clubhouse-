import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import '../public/style.css'
import '../public/another.css'

const router = createBrowserRouter(routes)

function App() {

  return (
    <div className="overflow-hidden h-[100vh]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
