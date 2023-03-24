import React, { useState } from 'react';
import './TimePicker.scss';
import { convertToTimeString } from '../../common/utils/helpers';

const TimePicker = (props) => {
  const [selected, setSelected] = useState({ index: 0 });

  const toggleSelected = (i) => {
    setSelected({ index: i });
    props.onTimeChange(props.timeList[i]);
  };

  if (!props.timeList.length > 0) {
    return <h4>No available times for selected day</h4>;
  } else {
    return (
      <div className="time-container">
        <ul>
          {props.timeList.map((timeslot, index) => (
            <li key={index}>
              <button
                onClick={toggleSelected.bind(this, index)}
                className={selected.index === index ? 'selected' : ''}
              >
                {convertToTimeString(timeslot.time)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default TimePicker;
