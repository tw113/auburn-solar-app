import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../auth/auth-context';
import { convertToTimeString } from '../../common/utils/helpers';

import './TimeslotGrid.scss';

const TimeslotGrid = (props) => {
  const authContext = useContext(AuthContext);
  const [blockedTimes, setBlockedTimes] = useState([]);
  const [times, setTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dayNames = ['Time', 'M', 'Tu', 'W', 'Th', 'F', 'S'];

  const buildTimes = () => {
    let tempTimes = [];
    for (let i = 7; i < 16; i++) {
      let newTime = new Date();
      newTime.setHours(i, 0, 0, 0);
      tempTimes.push(newTime);
    }

    setTimes(tempTimes);
  };

  const fetchTimeslotsHandler = () => {
    fetch('http://localhost:8080/schedule/times', {
      headers: {
        Authorization: `Bearer ${authContext.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.blockedTimes) {
          let fetchedBlockedTimes = [...data.blockedTimes];
          let timeList = [];
          fetchedBlockedTimes.forEach((time) => {
            let newTime = {
              startDatetime: new Date(time.startDatetime),
              weekday: time.weekday,
            };
            timeList.push(newTime);
          });
          setBlockedTimes(timeList);
        } else {
          // TODO: no times found
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    buildTimes();
    fetchTimeslotsHandler();
  }, []);

  const checkForBlockTime = (time, day) => {
    const timeToCheck = { startDatetime: new Date(time), weekday: day };
    
    if (
      timeToCheck &&
      blockedTimes.some(
        (x) =>
          x.startDatetime.getHours() === timeToCheck.startDatetime.getHours() &&
          x.weekday === timeToCheck.weekday
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkboxClickedHandler = (event) => {
    const time = new Date(JSON.parse(event.target.value).time);
    const day = JSON.parse(event.target.value).day;
    const isChecked = event.target.checked;
    const timeToCheck = { startDatetime: new Date(time), weekday: day };

    if (isChecked) {
      setIsLoading(true);
      const newList = blockedTimes.filter(
        (x) => JSON.stringify(x) !== JSON.stringify(timeToCheck)
      );
      setBlockedTimes(newList);
      setIsLoading(false);
      //console.log(newList);
    } else {
      setIsLoading(true);
      let currentBlockedTimes = [...blockedTimes];
      let newTime = {
        startDatetime: new Date(time),
        weekday: day,
      };

      currentBlockedTimes.push(newTime);
      setBlockedTimes(currentBlockedTimes);
      setIsLoading(false);
    }
  };

  const postBlockedTimesHandler = () => {
    fetch('http://localhost:8080/schedule/add-block', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authContext.token}`,
      },
      body: JSON.stringify(blockedTimes),
    }).then((res) => {
      if (res.ok) {
        //success
        return res.json();
      } else {
        console.log(res.json());
      }
    });
    props.onSave();
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div>
        <h3>Uncheck times that you are unavailable</h3>
        <table className="timeslot-grid">
          <thead>
            <tr>
              {dayNames.map((day, i) => (
                <th
                  key={i}
                  className="timeslot-grid__item timeslot-grid__item--header"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, i) => (
              <tr
                key={i}
                className="timeslot-grid__item timeslot-grid__item--timecolumn"
              >
                {dayNames.map((day, i) => {
                  if (i === 0) {
                    return <td key={i}>{convertToTimeString(time)}</td>;
                  } else if (checkForBlockTime(time, day)) {
                    return (
                      <td key={i}>
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={checkboxClickedHandler}
                          value={JSON.stringify({ time: time, day: day })}
                        />
                      </td>
                    );
                  } else {
                    return (
                      <td key={i}>
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          onChange={checkboxClickedHandler}
                          value={JSON.stringify({ time: time, day: day })}
                        />
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn__filled" onClick={postBlockedTimesHandler}>
          Save
        </button>
      </div>
    );
  }
};

export default TimeslotGrid;
