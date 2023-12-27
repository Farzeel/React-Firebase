import React from 'react'
import {Link,useNavigate} from "react-router-dom"
import { auth } from '../config/firebase'

import {useAuthState} from "react-firebase-hooks/auth"

const Navbar = () => {
const navigate = useNavigate()
   
const handleLogout = async()=>{
        await auth.signOut()
        navigate("/login")
    }

    const [user] = useAuthState(auth)
  return (
        <>
        <div className='NavBar-Section'>
        <div className='NavLeft'>
      <Link className='link' to={"/"}>Home</Link>
      {
        user ?(
            <>
            <Link className='link' to={"/createpost"}>CreatePost</Link>
            <button className='link' onClick={handleLogout}>logout</button>
            </>
        ) 
        :
        <Link className='link' to={"/login"}>login</Link> 
      }
     
    
    </div>
    {user &&
    <div className='NavRight'>
        <p>{user.displayName}</p>
        <img src={user.photoURL || ""} alt="" />
    </div>
    }
        </div>
      
    </>
  )
}

export default Navbar
