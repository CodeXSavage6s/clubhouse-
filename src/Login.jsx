import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from './context/userContext.jsx'

export default function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { setUser } = useUserContext();
  const navigate = useNavigate()
  
  async function handleLogin(e) {
    e.preventDefault()
    setError("");
    setLoading(true)
    
    if ( !password || !email) {
      setError("All fields are required"); 
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch("https://clubhouse-backend-aydg.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ password, email})
      });
      
      const result = await response.json()
      
      if (response.ok) {
       localStorage.setItem("user", JSON.stringify(result))
        setUser(result)
        setLoading(false)
        navigate("/")
      } else {
        setLoading(false)
        const errorMsg = Array.isArray(result.message) 
          ? result.message.map(e => e.msg).join(", ")
          : result.message;
        setError(errorMsg)
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(`Network error - ${err.message}`); 
      setLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center h-full pb-40">
      <form className=" w-[90%] rounded-2xl p-4 flex flex-col gap-5" onSubmit={handleLogin}>
        <h1 className="text-2xl font-extrabold text-center font-serif pb-3 ">Clubhouse Login Page</h1>
        
        {error && (
          <span className="text-red-500 bg-red-100 p-2 rounded text-sm">
            {error}
          </span>
        )}
        
        <div className="flex flex-col w-full gap-2">
          <label className="after:content-['*'] after:text-red-500">Email <b className="font-black">:</b> </label>
          <input type="email" className=" inputs" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col w-full gap-1.5 ">
          <label className="after:content-['*'] after:text-red-500">Password <b className="font-black">:</b> </label>
          <div className="w-full flex justify-between items-center has-focus:border-[var(--text-muted)] has-focus:border-2 p-2 inputs">
            <input type={show ? "text" : "password"} className="outline-none" onChange={(e) => setPassword(e.target.value)} value={password}/>
            <span onClick={() => setShow(n => !n)} className="">
              {show ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}</span>
          </div>
        </div>
        <button 
          type="submit"
          disabled={loading}
          className={`w-full text-center inputs text-2xl font-bold italic font-serif mt-5 py-2 rounded bg-blue-500 ${loading ? "bg-gray-400! cursor-not-allowed" : "bg-[var(--accent-purple)]! hover:bg-blue-600 text-white"}`}
          >
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="text-center text-blue-500">
          <Link to="/sign-up">Don't have an Account? Sign Up</Link>
        </div>
      </form>
      
    </div>
    )
}