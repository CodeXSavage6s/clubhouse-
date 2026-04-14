import Layout from './Pages/layout.jsx'
import Home from './Pages/home.jsx'
import Chat from './Pages/chat.jsx'
import Settings from './Pages/settings.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import ErrorPage from './Pages/error.jsx'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'chat',
        element: <Chat />
      },
      {
        path: 'settings',
        element: <Settings />
      }
      ]
  }, 
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/sign-up',
    element: <SignUp />
  }
  ];