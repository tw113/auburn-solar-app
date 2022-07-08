import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import InfoForm from '../components/InfoForm/InfoForm';
import InfoLogin from '../components/InfoLogin/InfoLogin';
import AuthContext from '../auth/auth-context';
import CalendarPicker from '../components/CalendarPicker/CalendarPicker';

const Request = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <div className="flex-center">
      <h1>Request Generator Maintenence</h1>
      <InfoForm />
      <CalendarPicker />
      <Link to="/">
        <button className="btn btn__filled">SUBMIT</button>
      </Link>
      {!authContext.isLoggedIn && (<InfoLogin></InfoLogin>)}
    </div>
  );
};

export default Request;
