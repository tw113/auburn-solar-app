import React, { useState } from 'react';
import './TimePicker.scss';

const TimePicker = (props) => {
  const [selected, setSelected] = useState({index: 0});

  const convertToTimeString = (availableDate) => {
    return availableDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const toggleSelected = (i) => {
    setSelected({index: i});
    props.onTimeChange(props.timeList[i]);
  }

  return (
    <div className="time-container">
      <ul>
        {props.timeList.map((ad, index) => (
          <li>
            <button
              key={index}
              onClick={toggleSelected.bind(this, index)}
              className={selected.index === index ? 'selected': ''}
            >
              {convertToTimeString(ad)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimePicker;
