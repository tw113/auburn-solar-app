import React, { useContext, useState, useRef } from 'react';
import InfoLogin from '../components/InfoLogin/InfoLogin';
import AuthContext from '../auth/auth-context';
import CalendarPicker from '../components/CalendarPicker/CalendarPicker';
import Success from '../components/CalendarPicker/Success';

const Request = (props) => {
  const authContext = useContext(AuthContext);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const address1Ref = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const apptTypeRef = useRef(0);
  const notesRef = useRef();

  const timeChangeHandler = (value) => {
    setSelectedTime(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredFirstname = firstNameRef.current.value;
    const enteredLastname = lastNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredAddress1 = address1Ref.current.value;
    const enteredCity = cityRef.current.value;
    const enteredState = stateRef.current.value;
    const enteredApptType = apptTypeRef.current.value;
    const enteredCustomerNotes = notesRef.current.value;

    fetch('http://localhost:8080/request/create-request', {
      method: 'POST',
      body: JSON.stringify({
        firstName: enteredFirstname,
        lastName: enteredLastname,
        email: enteredEmail,
        phone: enteredPhone,
        address1: enteredAddress1,
        city: enteredCity,
        state: enteredState,
        apptType: enteredApptType,
        startDatetime: selectedTime,
        customerNotes: enteredCustomerNotes
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          //success
          return res.json();
        } else {
          console.log(res.json());
        }
      })
      .then((data) => {
        setIsSubmitSuccess(true);
      });
  };

  if (!isSubmitSuccess) {
    return (
      <div className="flex-center">
        <h1>Request Generator Maintenence</h1>
        <form onSubmit={submitHandler}>
          <h2>Enter Your Information:</h2>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            ref={firstNameRef}
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            ref={lastNameRef}
            required
          />
          <label>
            Service Address:
            <input
              name="address1"
              type="text"
              placeholder="Address"
              ref={address1Ref}
              required
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              ref={cityRef}
              required
            />
            <input
              name="state"
              type="text"
              placeholder="State"
              ref={stateRef}
              required
            />
          </label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            ref={emailRef}
            required
          />
          <input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            ref={phoneRef}
            required
          />
          <label>
            Service Type:
            <select name="appt-type" ref={apptTypeRef} required>
              <option value="0">First Service</option>
              <option value="1">Regular Service (Yearly)</option>
            </select>
          </label>
          <input
            name="notes"
            type="text"
            placeholder="Notes (i.e. gate code, dog, etc."
            ref={notesRef}
          />
        </form>
        <CalendarPicker
          onTimeChange={timeChangeHandler}
          selectedApptType={apptTypeRef.current.value}
        />
        <button className="btn btn__filled" type="submit" form="request-form" onClick={submitHandler}>
          SUBMIT
        </button>
        {!authContext.isLoggedIn && <InfoLogin></InfoLogin>}
      </div>
    );
  } else {
    return <Success />;
  }
};

export default Request;
