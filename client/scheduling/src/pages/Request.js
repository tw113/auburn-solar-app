import React from 'react'
import { Link } from "react-router-dom";
import InfoForm from '../components/InfoForm/InfoForm';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import InfoLogin from '../components/InfoLogin/InfoLogin';

const Request = props => {
  return (
    <div className="flex-center">
      <h1>Request Generator Maintenence</h1>
      <InfoForm></InfoForm>
      <Link to="/pick-date">
        <button className="btn btn__filled">PICK A TIME <MdOutlineArrowForwardIos/></button>
      </Link>
      <InfoLogin></InfoLogin>
    </div>
  )
}

export default Request