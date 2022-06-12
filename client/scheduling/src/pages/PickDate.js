import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import CalendarPicker from '../components/CalendarPicker/CalendarPicker';

const PickDate = () => {
  return (
    <div>
      <h1>Pick a Day and Time For Your Maintenence</h1>
      <CalendarPicker />
      <Link to="/">
        <button className="btn btn__filled">PICK A TIME <MdOutlineArrowForwardIos/></button>
      </Link>
    </div>
  )
}

export default PickDate