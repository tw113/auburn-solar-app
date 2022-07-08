import React, { useContext, useState, useEffect } from 'react';
import DayCard from '../components/DayCard/DayCard';
import { convertToDayAndDate } from '../common/utils/helpers';
import AuthContext from '../auth/auth-context';

const WorkerUpcoming = () => {
  const authContext = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

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

        data.requests.forEach((request) => {
          loadedRequests.push({
            ...request,
            chosenDatetime: new Date(request.chosenDatetime),
          });
        });
        setRequests(loadedRequests);
      });
  };

  useEffect(() => {
    fetchRequestsHandler();
  }, []);

  let daysToShow = [];
  for (let i = 0; i < 10; i++) {
    let date = new Date(Date.now());
    date.setDate(date.getDate() + i);
    daysToShow.push(date);
  }

  return (
    <div>
      <h1 className="justify-left">{authContext.getName()}</h1>
      <button className="btn btn__filled">Set Schedule</button>
      <hr />
      <div className="content-container">
        <h2>Upcoming Appointments</h2>
        <ul>
          {daysToShow.map((day, i) => (
            <li key={i}>
              <DayCard
                day={convertToDayAndDate(new Date(day))}
                requests={requests.filter(
                  (x) => x.chosenDatetime.toDateString() === day.toDateString()
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkerUpcoming;
