import React from 'react'
import {useNavigate} from "react-router-dom"

import { provider, auth } from '../config/firebase'
import {signInWithPopup} from "firebase/auth"


const Login = () => {

    const navigate = useNavigate()
    
    const handleLogin = async ()=>{
 
        await signInWithPopup(auth, provider)
       navigate("/")

    //    console.log(data.user.displayName, data.user.uid)
    }
  return (
    <div>
        <h3>Login with Google</h3>
      <button onClick={handleLogin}>Google Login </button>
    </div>
  )
}

export default Login
