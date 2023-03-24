import React, { useContext, useState, useEffect } from 'react';
import DayCard from '../components/DayCard/DayCard';
import { convertToDayAndDate } from '../common/utils/helpers';
import AuthContext from '../auth/auth-context';
import TimeslotGrid from '../components/WorkerDashboard/TimeslotGrid';

const WorkerDashboard = () => {
  const authContext = useContext(AuthContext);
  const [isSetSchedule, setIsSetSchedule] = useState(false);
  const [requests, setRequests] = useState([]);

  let days = [];
  for (let i = 0; i < 10; i++) {
    let date = new Date(Date.now());
    date.setDate(date.getDate() + i);
    days.push(date);
  }

  const daysToShow = days;

  const setScheduleHandler = () => {
    setIsSetSchedule(!isSetSchedule);
  };

  const fetchRequestsHandler = () => {
    fetch('http://localhost:8080/request/requests', {
      headers: {
        Authorization: `Bearer ${authContext.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const loadedRequests = [];

        if (data.requests) {
          data.requests.forEach((request) => {
            loadedRequests.push({
              ...request,
              startDatetime: new Date(request.startDatetime),
            });
          });
          setRequests(loadedRequests);
        }
      });
  };

  useEffect(() => {
    fetchRequestsHandler();
  }, []);

  return (
    <div>
      <h1 className="justify-left">{authContext.getName()}</h1>
      <button className="btn btn__filled" onClick={setScheduleHandler}>
        {isSetSchedule ? 'Cancel' : 'Set Schedule'}
      </button>
      <hr />
      {isSetSchedule ? (
        <TimeslotGrid onSave={setScheduleHandler}/>
      ) : (
        <div className="content-container">
          <h2>Upcoming Appointments</h2>
          <ul>
            {daysToShow.map((day, i) => (
              <li key={i}>
                <DayCard
                  day={convertToDayAndDate(new Date(day))}
                  requests={requests.filter(
                    (x) => x.startDatetime.toDateString() === day.toDateString()
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
