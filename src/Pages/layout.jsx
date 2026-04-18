import { useState, useMemo, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar.jsx'
import { useUserContext } from '../context/userContext.jsx'

export default function Layout() {
  const [seen, setSeen] = useState(false)
  const { user } = useUserContext();
  const navigate = useNavigate()
  // Move the star logic here so it persists across all routes
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 2 + 1;
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '50%',
        opacity: Math.random() * 0.7 + 0.3,
        // Optional: slow drift or twinkle
        animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
        animationDelay: `${Math.random() * 5}s`
      };

      starArray.push(
        <div key={i} className="star pointer-events-none" style={style} />
      );
    }
    return starArray;
  }, []);
  
  useEffect(() => {
    if (!user) { 
      alert("login first")
      navigate("/login")
    }
    
    return () => {
      
    }
  }, [])
  
  return (
    <div className="min-h-[100dvh] max-h-[100dvh] flex flex-col relative bg-[#050505] overflow-hidden">
      
      {/* GLOBAL STAR BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {stars}
      </div>

      <header className="flex flex-row justify-between items-center relative bg-[var(--bg-secondary)]/80 backdrop-blur-md text-[var(--text-primary)] p-2 z-50 border-b border-[var(--border-color)]">
        <h1 className="font-bold text-xl">Chat App</h1>
        
        <button 
          className="z-50 p-2 hover:bg-[var(--bg-input)] rounded-md transition-colors text-2xl"
          onClick={() => setSeen(prev => !prev)}
        >
          ☰
        </button>

        <nav className={`
          fixed top-0 right-0 h-[92vh] w-[250px] p-5
          bg-[var(--bg-card)] border-l border-[var(--border-color)]
          transition-transform duration-300 ease-in-out shadow-md z-50 z-50
          ${seen ? "translate-x-0" : "translate-x-full"}
        rounded-[5vh] overflow-hidden`}>
          <div className="absolute top-2 right-5 text-2xl font-bold"
          onClick={() => setSeen(false)}>✕</div>
          <Sidebar />
        </nav>
      </header>


      <main className="flex-1 overflow-scroll relative z-10" onClick={() => setSeen(false)}>
        <Outlet />
      </main>
      
      <footer className="relative z-10"></footer>
    </div>
  )
}
