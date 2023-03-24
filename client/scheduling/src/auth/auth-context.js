import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  role: 0,
  email: '',
  name: '',
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialRole = localStorage.getItem('role');
  const [token, setToken] = useState(initialToken);
  const [role, setRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const loginHandler = (token, email, name, role) => {
    setToken(token);
    setRole(role);
    setEmail(email);
    setName(name);
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    
    setTimeout(logoutHandler, 60 * 60000);
  };

  const getName = () => {
    if (name === '') {
      return localStorage.getItem('name');
    } else {
      return name;
    }
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    role: role,
    email: email,
    getName: getName,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
