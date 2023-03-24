import React from 'react';
import './ApptCard.scss';
import { convertToTimeString } from '../../common/utils/helpers';

const ApptCard = (props) => {
  return (
    <div className="card">
      <div className="card__timebox">
        <div className="card__timebox--time">
          {convertToTimeString(props.request.startDatetime, true, false)}
        </div>
        <div>{convertToTimeString(props.request.startDatetime, false, true)}</div>
      </div>
      <div className="card__infobox">
        <div className="card__infobox--title">{props.request.apptType}</div>
        <div>{props.request.address1}</div>
        <div>
          {props.request.city}, {props.request.state}
        </div>
      </div>
      <div className="card__notes">
        <strong>Customer: </strong>{props.request.lastName}
        <h5>Customer Notes</h5>
        {props.request.customerNotes}
      </div>
    </div>
  );
};

export default ApptCard;
