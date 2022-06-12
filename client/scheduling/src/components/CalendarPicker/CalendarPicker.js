import React, { useState } from 'react';
import "./CalendarPicker.scss";
import Calendar from 'react-calendar';

const CalendarPicker = () => {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <div className="calendar-container">
      <Calendar onChange={onChange} value={value}/>
    </div>
  )
}

export default CalendarPicker