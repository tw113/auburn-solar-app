import React, { useState, useEffect } from 'react';
import './CalendarPicker.scss';
import Calendar from 'react-calendar';
import TimePicker from './TimePicker';

const CalendarPicker = (props) => {
  const initialDatetime = new Date();
  initialDatetime.setHours(0, 0, 0, 0);
  const [selectedTime, setSelectedTime] = useState(initialDatetime);
  const [selectedDate, setSelectedDate] = useState(initialDatetime);
  const [openTimeslots, setOpenTimeslots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const fetchTimeslotsHandler = (selectedDate) => {
    setIsLoading(true);
    const searchDate = `${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;

    fetch(`http://localhost:8080/request/times/${searchDate}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const blockedTimes = [];

        if (data.blockedTimes) {
          data.blockedTimes.forEach((time) => {
            blockedTimes.push({
              startDatetime: new Date(time.startDatetime),
            });
          });
        }

        let openTimeslots = [];

        for (let i = 7; i < 16; i++) {
          let newTime = new Date(selectedDate);
          newTime.setHours(i);

          if (
            !blockedTimes.some(
              (time) => time.startDatetime.getHours() === newTime.getHours()
            )
          ) {
            openTimeslots.push({
              time: new Date(newTime),
            });
          }
        }

        setOpenTimeslots(openTimeslots);
        setSelectedTime(openTimeslots[0].startDatetime);

        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTimeslotsHandler(selectedDate);
  }, []);

  const onDateChange = (nextValue) => {
    setSelectedDate(nextValue);
    fetchTimeslotsHandler(nextValue);
  };

  const timeChangeHandler = (nextValue) => {
    setSelectedTime(nextValue);
  };

  return (
    <div>
      <div className="calendar-container">
        <Calendar
          onChange={onDateChange}
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
            if (date.getDay() === 0 || date < Date.now()) {
              return true;
            }
          }}
          formatShortWeekday={(locale, date) => dayNames[date.getDay()]}
          value={selectedDate}
        />
      </div>
      <div className="time-container">
        {!isLoading && (
          <TimePicker
            onTimeChange={timeChangeHandler}
            timeList={openTimeslots}
            value={selectedTime}
          ></TimePicker>
        )}
      </div>
    </div>
  );
};

export default CalendarPicker;
