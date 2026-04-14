import React, { useMemo, useState, useEffect } from 'react';
import { io } from 'socket.io-client'


export default function Chat() {
  const socket = io('http://localhost:5000/')
  
  const [text, setText] = useState("")
  const [connected, setConnected] = useState(socket.connected)
  
  useEffect(() => {
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    }
  }, [])
  
  // useMemo ensures the stars are only generated once when the component mounts
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 400; i++) {
      const size = Math.random() * 2 + 0.5;
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute', // Essential for the top/left to work
        backgroundColor: 'white',
        borderRadius: '50%',
        animationDuration: `${1.5 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 3}s`,
        opacity: Math.random(), // Adds depth
      };

      starArray.push(
        <div key={i} className="star pointer-events-none" style={style} />
      );
    }
    return starArray;
  }, []);

  return (
    <div className="flex flex-col h-[85vh]">
      <div className="star-background absolute inset-0 z-0">
        {stars}
      </div>
      <h1>{connected ? "Connected" : "Not Connected"}</h1>
      <h1 className="title relative z-10 text-white text-2xl p-4">Chats</h1>
      <div className="flex-1"></div>
      <div className="relative bg-[var(--bg-secondary)] p-3 px-4 w-[95vw] bottom-[10px] rounded-4xl right-[2.5vw] flex flex-row has-focus:border-2 has-focus:border-[var(--text-muted)] self-end">
        <input type="text" className=" w-full placeholder-[var(--text-muted)] outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter message..."/><button>
          <i className="fa-solid fa-location-arrow text-2xl"></i>
        </button>
      </div>
    </div>
  );
}
