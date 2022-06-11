import React from 'react'
import { Link } from "react-router-dom";
import InfoForm from '../components/InfoForm/InfoForm';

const Request = props => {
  return (
    <div>
      <h1>Request Generator Maintenence</h1>
      <InfoForm></InfoForm>
      <button className="btn btn__filled">Create Account</button>
      <h3>Already have an account? <Link to="/">Login</Link></h3>
    </div>
  )
}

export default Request