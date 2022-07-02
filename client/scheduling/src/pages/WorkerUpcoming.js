import React from 'react';
import DayCard from '../components/DayCard/DayCard';
import { Request } from '../models/request';
import { convertToDayAndDate } from '../common/utils/helpers';

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
];

const WorkerUpcoming = () => {
  const fullName = 'John Doe';
  const workerId = 1;
  const requestsFiltered = requests.filter((x) => (x.workerId = workerId));

  let daysToShow = [];
  for (let i = 0; i < 10; i++) {
    let date = new Date(Date.now());
    date.setDate(date.getDate() + i);
    daysToShow.push(date);
  }

  console.log(daysToShow);

  return (
    <div>
      <h1 className="justify-left">{fullName}</h1>
      <button className="btn btn__filled">Set Schedule</button>
      <hr />
      <div className="content-container">
        <h2>Upcoming Appointments</h2>
        <ul>
          {daysToShow.map((day, i) => (
            <li key={i}>
              <DayCard
              day={convertToDayAndDate(new Date(day))}
              requests={requestsFiltered.filter(x => x.time.toDateString() === day.toDateString())}
            />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkerUpcoming;
