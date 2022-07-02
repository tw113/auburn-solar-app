import React from 'react';
import "./InfoLogin.scss";
import { Link } from 'react-router-dom';

const InfoLogin = () => {
  return (
    <div className="info-container">
      <h3>To track your requests, schedule recurring maintenance, and pay your bill</h3>
      <h3><Link to="/login">Login</Link> or <Link to="/create-account">Create an Account</Link></h3>
    </div>
  )
}

export default InfoLogin