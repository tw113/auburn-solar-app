import React, { useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../auth/auth-context';
//import { FcGoogle } from 'react-icons/fc'

const Login = (props) => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const authContext = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.json());
        }
      })
      .then((data) => {
        authContext.login(data.token, data.user.email, `${data.user.firstName} ${data.user.lastName}`, data.role);
        //console.log(data);
        switch (data.role) {
          case 0:
            navigate('/', { replace: true });
            break;
          case 1:
          case 2:
            navigate('/dashboard', { replace: true });
            break;
          case 3:
            // TODO: go to admin page
            // for now:
            navigate('/', { replace: true });
            break;

          default:
            navigate('/', { replace: true });
            break;
        }
      });
  };

  return (
    <div className="flex-center">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
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
          Login
        </button>
      </form>
      {/* <hr/>
      <button className="btn btn__outline">Sign in with Google <FcGoogle/></button> */}
      <h3>
        Don't have an account? <Link to="/create-account">Create Account</Link>
      </h3>
    </div>
  );
};

export default Login;
