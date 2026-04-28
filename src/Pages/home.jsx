import { useRef, useEffect } from 'react'
import { useUserContext } from '../context/userContext.jsx'
import { Link } from 'react-router-dom'
import Typed from 'typed.js'

export default function Home() {
  const { user } = useUserContext();
  const type = useRef(null)
  
  
  useEffect(() => {
    const typed = new Typed(type.current, {
      strings: ["Welcome to the club", "Become a member an recieve more access", "Share media and message to other club members", "Recommend new features"],
      typeSpeed: 70,
      backSpeed: 40,
      loop: true,
      showCursor: false
    });
  });
  
  return (
    <div className="text-center flex-col flex gap-6 justify-center content-center h-full">
      <h1 className="text-3xl font-bold font-serif italic text-[var(--accent-blue)] mt-5">Welcome User {user?.user.username}</h1>
      
      <Link to="/chat" className="text-3xl font-bold font-serif italic ">To Chat</Link>
      
      <div className="absolute bottom-1 w-full items-center">
        <span ref={type} className="text-lg text-[var(--text-muted)] text-center"></span>
      </div>
    </div>
    )
}