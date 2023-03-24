import React, { useContext } from 'react'
import InfoLogin from '../InfoLogin/InfoLogin';
import AuthContext from '../../auth/auth-context';

const Success = props => {
  const authContext = useContext(AuthContext);

  return (
    <div className="flex-center">
      <h1>Success! You have scheduled generator maintenence on:</h1>
      {/* TODO show and time of request */}
      {!authContext.isLoggedIn && <InfoLogin></InfoLogin>}
    </div>
  )
}

export default Success