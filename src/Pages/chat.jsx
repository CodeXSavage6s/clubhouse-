import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useSocketContext } from '../context/socketContext.jsx';
import { useUserContext } from '../context/userContext.jsx';

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const { socket, connected } = useSocketContext();
  const { user } = useUserContext();
  const scrollRef = useRef(null);
  const [file, setFile] = useState("")
  const [img, setImg] = useState("")
  const [isUploading, setIsUploading] = useState(false)

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

    socket.emit("send_message", { text, img });
    setText("");
  };

  // Scroll to bottom when chats update
  useEffect(() => {
  scrollRef.current?.scrollTo({
    top: scrollRef.current.scrollHeight,
    behavior: "smooth"
  });
}, [chats]);

  // Fetch initial chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("http://localhost:5000/chats", {
          credentials: "include"
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setChats(result || []);
        }
      } catch (err) {
        console.error("Error fetching chats:", err);
        // alert("error", err); // optional
      }
    };

    fetchChats();
  }, []); // Run only once on mount

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      setChats((prev) => {
        if (Array.isArray(data)) {
          return [...prev, ...data]; // history
        }
        return [...prev, data]; // single message
      });
    };

    socket.on("load_message", handleNewMessage);
    socket.on("new_message", handleNewMessage);

    return () => {
      socket.off("load_message", handleNewMessage);
      socket.off("new_message", handleNewMessage);
    };
  }, [socket]);
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    alert("file", file)
    setIsUploading(true)
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        credentials: 'include',
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        setImg(result?.url);
        setIsUploading(false)
      }
    } catch (err) {
      console.error(err);
      setIsUploading(false)
    }
  };

  return (
    <div className="flex flex-col h-[75vh] relative overflow-hidden bg-black">
      <div className="star-background absolute inset-0 z-0">
        {stars}
      </div>

      <div className="fixed z-999">
        <p className={connected ? "text-green-500" : "text-red-500"}>
          {connected ? "● Connected" : "● Disconnected"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 relative z-10 flex w-full flex-col " ref={scrollRef}>
        {chats.map((msg, index) => (
        <div className="max-h-[400px] w-full flex flex-col">
          <div 
            key={index} 
            className={`flex flex-col mb-2 p-3 bg-[var(--bg-input)] rounded max-w-[60%] rounded-tl-4xl rounded-tr-4xl rounded-br-4xl skew-x-[-5deg]
              ${msg.username ===  "You" ? "self-end bg-[var(--bg-secondary)] rounded-br-[0px] rounded-bl-4xl skew-x-[5deg]" : ""}`}
          >
            <span className="text-[var(--text-muted)]">{msg.username}</span>
            <h1 className="text-white text-xl font-medium">{msg.text}</h1>
            <b className="text-[small] self-end">
              {new Date(msg.created_at).toLocaleString()}
            </b>
          </div>
            <img src={msg.images} className={`h-full w-fit ${msg.username ===  "You" ? "self-end max-h-[300px] w-fit" : ""}`}/>
        </div>
        ))}
      </div>
      
      <div className="flex flex-col">
        <div className="max-h-[100px]">
          <img src={img} className="h-full"/>
        </div>
      <form 
        onSubmit={sendMessage}
        className="self-end z-10 bg-[var(--bg-secondary)] p-3 px-4 w-full rounded-full flex flex-row items-center border border-gray-700"
      >
      <input type="file" id="file" name="file"  className="z-999 hidden" onChange={handleFileUpload}/>
      <label htmlFor="file" >
        <i className={`fa-solid ${isUploading ? 'fa-spinner animate-spin' : 'fa-plus'} text-xl`}></i>
      </label>
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
    </div>
  );
}