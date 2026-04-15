import React, { useMemo, useState, useEffect } from 'react';
import { useSocketContext } from '../context/socketContext.jsx';

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState([]);
  const [text, setText] = useState("");
  const { socket, connected } = useSocketContext();

  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 400; i++) {
      const size = Math.random() * 2 + 0.5;
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '50%',
        animationDuration: `${1.5 + Math.random() * 3}s`,
        animationDelay: `${Math.random() * 3}s`,
        opacity: Math.random(),
      };
      starArray.push(<div key={i} className="star pointer-events-none" style={style} />);
    }
    return starArray;
  }, []);

  const sendMessage = (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;
    if (!socket) return alert("Not connected");

    socket.emit("send_message", { text });
    setText("");
  };

  useEffect(() => {
    if (!socket) return;
  
  
  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:5000/chats");
      
      if (response.ok) {
        const result = await response.json();
        // result is now the actual data, not a Promise object
        console.log(result); 
        alert(JSON.stringify(result, null, 2));
        //alert(result)
        setChats(result); // Usually you'd update state here
      }
    } catch (err) {
      alert("error", err)
      console.error("error", err);
    }
  };

  fetchChats();
  
    const handleNewMessage = (data) => {
  setChats((prev) => {
    if (Array.isArray(data)) {
      return [...prev, ...data]; // Spread the history array
    }
    return [...prev, data]; // Append single new message
  });
};


    socket.on("load_message", handleNewMessage);
    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("load_message", handleNewMessage);
      socket.off("new_message", handleNewMessage);
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-[85vh] relative overflow-hidden bg-black">
      <div className="star-background absolute inset-0 z-0">
        {stars}
      </div>

      <div className="relative z-10 p-4 border-b border-gray-800">
        <h1 className="text-white text-2xl font-bold">Chats</h1>
        <p className={connected ? "text-green-500" : "text-red-500"}>
          {connected ? "● Connected" : "● Disconnected"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 relative z-10">
        {chats.map((msg, index) => (
          <div key={index} className="mb-2">
            <h1 className="text-white text-xl font-medium">{msg.text}</h1>
          </div>
        ))}
      </div>

      <form 
        onSubmit={sendMessage}
        className="relative z-10 bg-[var(--bg-secondary)] p-3 px-4 w-[95vw] mb-4 mx-auto rounded-full flex flex-row items-center border border-gray-700"
      >
        <input 
          type="text" 
          className="bg-transparent text-white w-full outline-none px-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter message..."
        />
        <button type="submit" className="text-blue-400 hover:text-blue-300">
          <i className="fa-solid fa-location-arrow text-2xl"></i>
        </button>
      </form>
    </div>
  );
}
