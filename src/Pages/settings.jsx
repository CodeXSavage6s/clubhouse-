import { useState } from 'react'
import { useUserContext } from '../context/userContext.jsx'

export default function Settings() {
  const { user, setUser } = useUserContext()
  const User = user.user
  const [profile, setProfile] = useState(null)
  
  async function Upload(e) {

    const pro = e.target.files[0]
    const formData = new FormData();
    formData.append('file', pro)
    
    try {
    const response = await fetch("https://clubhouse-backend-aydg.onrender.com/profile", {
      credentials: 'include',
      method: 'POST',
      body: formData
    })
    
    const result = await response.json()
    
    if (response.ok) {
      alert(JSON.stringify(result))
      setUser(result)
    }
    } catch (err) {
      console.error("error messa: ", err)
    }
  }
  return (
    <div className="flex flex-col gap-5 justify-center p-2">
      <div className="flex flex-col items-center text-center gap-2">
          <div className="h-[100px] w-[100px] rounded-full overflow-hidden self-center">
          <img src={User?.profile} className="h-full w-fit"/>
        </div>
          <p className="text-2xl mb-3 font-serif font-bold text-gray-100">{User?.username}</p>
        <div className="columns-3 w-full">
          <label className="flex flex-col bg-[var(--bg-secondary)] text-center rounded-lg p-2 gap-2">
          <input type="file" onChange={Upload} className="hidden"/>
          <i className="fa fa-camera text-2xl"></i>
          <p className="font-serif font-semibold">Set Photo</p>
        </label>
          <div className="flex flex-col bg-[var(--bg-secondary)] text-center rounded-lg p-2 gap-2">
          <i className="fa fa-pencil text-2xl"></i>
          <p className="font-serif font-semibold">Edit </p>
        </div>
          <div className="flex flex-col bg-[var(--bg-secondary)] text-center rounded-lg p-2 gap-2">
          <i className="fa fa-cog text-2xl"></i>
          <p className="font-serif font-semibold">Settings</p>
        </div>
        </div>
        <div className="text-start w-full bg-[var(--bg-secondary)] p-3 rounded-lg">
          <p>{User?.email}</p>
          <hr className="text-[var(--text-muted)] my-2"/>
          <p>Joined at {new Date(User.created_at).toLocaleString()}</p>
          <hr className="text-[var(--text-muted)] my-2"/>
          <p>Status: {User.is_member ? "Member" : "Not Member"}</p>
          <hr className="text-[var(--text-muted)] my-2"/>
        </div>
      </div>
      <div className="absolute bg-[var(--bg-primary)] w-[100vw] h-[100vh] z-50">
        
      </div>
    </div>
    )
}