import React from 'react'

const InfoForm = () => {
  return (
    <div>
      <form>
        <h2>Enter Your Information:</h2>
        <input name="firstName" type="text" placeholder="First Name"/>
        <input name="lastName" type="text" placeholder="Last Name"/>
        <input name="address" type="text" placeholder="Address"/>
        <input name="email" type="text" placeholder="Email"/>
        <input name="phoneNumber" type="text" placeholder="Phone Number"/>
        <input name="generator" type="text" placeholder="Generator Size"/>
      </form>
    </div>
  )
}

export default InfoForm