import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext.jsx'

export default function Sidebar() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate()
  
  async function handleLogout() {
    try {
      const response = await fetch("https://clubhouse-backend-v95l.onrender.com/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        } 
        })
        setUser(null)
        navigate("/login")
        //localStorage.removeItem('user')
         }    catch (err) {
          alert(`error loging out ${err.message}`)
        }
  }
  
  return (
    <div className="w-full h-full flex items-center flex-col pt-10 gap-3">
      <div className="flex flex-col gap-3
      text-center">
        <div className="h-[150px] w-[150px] rounded-full overflow-hidden self-center">
          <img src={user?.user?.profile} className="h-full w-fit mb-5"/>
        </div>
      <div>
        <p> {user?.user.username}</p>
        <p> {user?.user.email}</p>
        <p> {user?.user.created_at}</p>
        <p> {user?.user.password}</p>
        <p>Status: {user?.user.is_member ? "Member" : "Not a Member"}</p>
      </div>
        <Link to="settings">Manage Your Account</Link>
      </div>
      <div className="relative self-end text-[var(--error)]" onClick={handleLogout}>Logout</div>
    </div>
    )
}