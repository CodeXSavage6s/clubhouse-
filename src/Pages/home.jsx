import { useUserContext } from '../context/userContext.jsx'
import { Link } from 'react-router-dom'

export default function Home() {
  const { user } = useUserContext();
  
  return (
    <div className="text-center flex-col flex gap-6 justify-center content-center h-full">
      <h1 className="text-3xl font-bold font-serif italic text-[var(--accent-blue)] mt-5">Welcome User {user?.user.username}</h1>
      
      <Link to="/chat" className="text-3xl font-bold font-serif italic ">To Chat</Link>
    </div>
    )
}