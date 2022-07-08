import React from 'react'
import ApptCard from '../ApptCard/ApptCard';
import './DayCard.scss';

const DayCard = (props) => {
  return (
    <div className="day-container">
      <h4>{props.day}</h4>
      {Object.keys(props.requests).length === 0 ? <h5>No Appointments</h5> : ""}
      <ul>
          {props.requests.map((request, index) => (
            <li key={index}>
              <ApptCard request={request} />
            </li>
          ))}
        </ul>
    </div>
  )
}

export default DayCard