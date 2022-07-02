import React, { useState } from 'react';
import './CalendarPicker.scss';
import Calendar from 'react-calendar';
import TimePicker from './TimePicker';
import { Request } from '../../models/request';

//dummy data
const requests = [
  new Request(
    1,
    1,
    'Tanner',
    'Wilson',
    '123 street rd',
    'Auburn',
    'CA',
    '14kw Generator',
    new Date(2022, 5, 29, 8),
    'This is a note from the customer'
  ),
  new Request(
    2,
    1,
    'Jobby',
    'Joesian',
    '123 street rd',
    'Sacramento',
    'CA',
    '14kw Generator',
    new Date(2022, 5, 29, 15, 30),
    'This is a note from the customer'
  ),
  new Request(
    3,
    2,
    'Doodeedoo',
    'Shoobydoo',
    '123 street rd',
    'Grass Valley',
    'CA',
    '14kw Generator',
    new Date(2022, 5, 30, 14),
    'This is a note from the customer'
  ),
  new Request(
    3,
    2,
    'Doodeedoo',
    'Shoobydoo',
    '123 street rd',
    'Grass Valley',
    'CA',
    '14kw Generator',
    new Date(2022, 6, 1, 9),
    'This is a note from the customer'
  ),
];

const CalendarPicker = () => {
  const [selectedTime, setTime] = useState(new Date());
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const availableDates = [];

  requests.forEach((request) => {
    availableDates.push(request.time);
  });

  const [selectedDate, setDate] = useState(availableDates[0]);

  const timeList = availableDates.filter((ad) => {
    return ad.toDateString() === selectedDate.toDateString();
  });

  function onDateChange(nextValue) {
    setDate(nextValue);
  }

  const timeChangeHandler = (nextValue) => {
    setTime(nextValue);
    console.log(selectedTime);
  };

  return (
    <div>
      <div className="calendar-container">
        <Calendar
          onChange={onDateChange}
          minDate={new Date(Date.now)}
          calendarType="US"
          next2Label={null}
          prev2Label={null}
          minDetail="month"
          maxDetail="month"
          tileClassName={({ date }) => {
            if (date.toDateString() === selectedDate.toDateString()) {
              return 'selected';
            }
          }}
          tileDisabled={({ activeStartDate, date, view }) => {
            if (
              !availableDates.some(
                (x) =>
                  x.getDate() === date.getDate() &&
                  x.getMonth() === date.getMonth()
              ) ||
              date.getDay() === 0 ||
              date < Date.now()
            ) {
              return true;
            }
          }}
          formatShortWeekday={(locale, date) => dayNames[date.getDay()]}
          value={selectedDate}
        />
      </div>
      <div className="time-container">
        <TimePicker
          onTimeChange={timeChangeHandler}
          timeList={timeList}
          value={selectedTime}
        ></TimePicker>
      </div>
    </div>
  );
};

export default CalendarPicker;
