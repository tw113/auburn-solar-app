import React from 'react'
import { Link } from "react-router-dom";
import InfoForm from '../components/InfoForm/InfoForm';
import { FcGoogle } from 'react-icons/fc'

const CreateAccount = props => {
  return (
    <div className="flex-center">
      <h1>Create Account</h1>
      <h3>Already have an account? <Link to="/login">Login</Link></h3>
      <InfoForm></InfoForm>
      <button className="btn btn__filled">Create Account</button>
      <hr/>
      <button className="btn btn__outline">Sign in with Google <FcGoogle/></button>
    </div>
  )
}

export default CreateAccount