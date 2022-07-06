import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
// import InfoForm from '../components/InfoForm/InfoForm';
// import { FcGoogle } from 'react-icons/fc'

const CreateAccount = (props) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    //console.log(formState);

    const enteredFirstname = firstNameRef.current.value;
    const enteredLastname = lastNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        firstName: enteredFirstname,
        lastName: enteredLastname,
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res.json());
    });
  };

  return (
    <div className="flex-center">
      <h1>Create Account</h1>
      <h3>
        Already have an account? <Link to="/login">Login</Link>
      </h3>
      <form onSubmit={submitHandler}>
        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          required
          ref={firstNameRef}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
          ref={lastNameRef}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          ref={emailRef}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          ref={passwordRef}
        />
        <button className="btn btn__filled" type="submit">
          Create Account
        </button>
      </form>
      {/* <hr/>
      <button className="btn btn__outline">Sign in with Google <FcGoogle/></button> */}
    </div>
  );
};

export default CreateAccount;
