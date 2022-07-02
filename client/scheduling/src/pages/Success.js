import React from 'react'
import InfoLogin from '../components/InfoLogin/InfoLogin';

const Success = props => {
  return (
    <div className="flex-center">
      <h1>Success! You have scheduled generator maintenence on:</h1>
      {/* TODO show and time of request */}
      <InfoLogin></InfoLogin>
    </div>
  )
}

export default Success