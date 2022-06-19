import React, { useState } from 'react';
import './CalendarPicker.scss';
import Calendar from 'react-calendar';
import TimePicker from './TimePicker';

const CalendarPicker = () => {
  const [selectedDate, setDate] = useState(new Date());
  const [selectedTime, setTime] = useState(new Date());
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const availableDates = [
    new Date(2022, 5, 20, 8),
    new Date(2022, 5, 21, 9),
    new Date(2022, 5, 21, 9, 30),
    new Date(2022, 5, 21, 10),
    new Date(2022, 5, 24, 13),
    new Date(2022, 5, 24, 14),
    new Date(2022, 5, 24, 15, 30),
    new Date(2022, 5, 24, 16),
  ];

  const timeList = availableDates.filter((ad) => {
    return ad.toDateString() === selectedDate.toDateString();
  });

  function onDateChange(nextValue) {
    setDate(nextValue);
  }

  const timeChangeHandler = (nextValue) => {
    setTime(nextValue);
    console.log(selectedTime);
  }

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
            if (date.getDate() === selectedDate.getDate()) {
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
