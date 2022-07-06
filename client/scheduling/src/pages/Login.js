import React from 'react'
import { Link } from "react-router-dom";
//import { FcGoogle } from 'react-icons/fc'

const Login = props => {
  return (
    <div className="flex-center">
      <h1>Login</h1>
      <form>
        <input name="email" type="email" placeholder="Email"/>
        <input name="password" type="password" placeholder="Password"/>
      </form>
      <Link to="/"><button className="btn btn__filled">Login</button></Link>
      {/* <hr/>
      <button className="btn btn__outline">Sign in with Google <FcGoogle/></button> */}
      <h3>Don't have an account? <Link to="/create-account">Create Account</Link></h3>
    </div>
  )
}

export default Login