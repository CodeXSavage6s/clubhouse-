import { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  
  async function handleSignUp(e) {
    e.preventDefault()
    setError("");
    setLoading(true)
    
    if (!username || !password || !email) {
      setError("All fields are required"); 
      setLoading(false); // ✅ Don't forget to stop loading
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email})
      });
      
      const result = await response.json()
      
      if (response.ok) {
        setLoading(false)
        navigate("/login")
      } else {
        setLoading(false)
        const errorMsg = Array.isArray(result.message) 
          ? result.message.map(e => e.msg).join(", ")
          : result.message;
        setError(errorMsg)
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error - is the server running?"); // ✅ Fixed: use err.message or custom text
      setLoading(false);
    }
  }
  
  return (
    <div className="flex justify-center items-center h-full pb-30">
      <form className="w-[90%] rounded-2xl p-4 flex flex-col gap-5" onSubmit={handleSignUp}>
        <h1 className="text-2xl font-extrabold text-center font-serif pb-3">Clubhouse Sign-Up Page</h1>
        
        {error && (
          <span className="text-red-500 bg-red-100 p-2 rounded text-sm">
            {error}
          </span>
        )}
        
        <div className="flex flex-col w-full gap-2">
          <label className="after:content-['*'] after:text-red-500">username <b className="font-black">:</b> </label>
          <input type="text" className="inputs" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="after:content-['*'] after:text-red-500">Email <b className="font-black">:</b> </label>
          <input type="email" className="inputs" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col w-full gap-1.5">
          <label className="after:content-['*'] after:text-red-500">Password <b className="font-black">:</b> </label>
          <div className="w-full flex justify-between items-center has-focus:border-[var(--text-muted)] has-focus:border-2 p-2 inputs">
            <input type={show ? "text" : "password"} className="outline-none" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <span onClick={() => setShow(n => !n)}>
              {show ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </span>
          </div>
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className={`w-full text-center inputs text-2xl font-bold italic font-serif mt-5 py-2 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          {loading ? "Signing up..." : "Sign-Up"}
        </button>
        
        <div className="text-center text-blue-500">
          <Link to="/login">Already have an Account? Login</Link>
        </div>
      </form>
    </div>
  )
}
