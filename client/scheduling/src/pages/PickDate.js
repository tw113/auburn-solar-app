import React from 'react';
import { Link } from 'react-router-dom';
import CalendarPicker from '../components/CalendarPicker/CalendarPicker';

const PickDate = () => {
  return (
    <div className="flex-center">
      <h1>Pick a Day and Time For Your Maintenence</h1>
      <CalendarPicker />
      <Link to="/">
        <button className="btn btn__filled">SUBMIT</button>
      </Link>
    </div>
  )
}

export default PickDate