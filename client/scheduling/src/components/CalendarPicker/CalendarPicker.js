import React, { useState, useEffect } from 'react';
import './CalendarPicker.scss';
import Calendar from 'react-calendar';
import TimePicker from './TimePicker';

const CalendarPicker = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openTimeslots, setOpenTimeslots] = useState([]);
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const fetchTimeslotsHandler = () => {
    fetch('http://localhost:8080/schedule/timeslots')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const loadedTimeslots = [];

        data.timeslots.forEach(timeslot => {
          loadedTimeslots.push({
            id: timeslot._id,
            workerId: timeslot.workerId,
            datetime: new Date(timeslot.datetime),
            isBooked: timeslot.isBooked
          })
        });
        setOpenTimeslots(loadedTimeslots);
        setSelectedDate(loadedTimeslots[0].datetime);
        setSelectedTime(loadedTimeslots[0].datetime);
      });
  };

  useEffect(() => {
    fetchTimeslotsHandler();
  }, []);
  

  function onDateChange(nextValue) {
    setSelectedDate(nextValue);
  }

  const timeChangeHandler = (nextValue) => {
    setSelectedTime(nextValue);
  };

  return (
    <div>
      <div className="calendar-container">
        {/* <ul>
          {openTimeslots.map((timeslot, index) => {
            return <li key={index}>{timeslot.datetime}</li>;
          })}
        </ul> */}
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
              !openTimeslots.some(
                (x) =>
                  x.datetime.getDate() === date.getDate() &&
                  x.datetime.getMonth() === date.getMonth()
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
          timeList={openTimeslots}
          value={selectedTime}
        ></TimePicker>
      </div>
    </div>
  );
};

export default CalendarPicker;
