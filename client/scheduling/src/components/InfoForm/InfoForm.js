import React from 'react'

const InfoForm = (props) => {
  return (
    <div>
      <form id={props.formId}>
        <h2>Enter Your Information:</h2>
        <input name="firstName" type="text" placeholder="First Name"/>
        <input name="lastName" type="text" placeholder="Last Name"/>
        <input name="address" type="text" placeholder="Address"/>
        <input name="email" type="text" placeholder="Email"/>
        <input name="phoneNumber" type="text" placeholder="Phone Number"/>
        <input name="generator" type="text" placeholder="Generator Size"/>
        <input name="notes" type="text" placeholder="Notes (i.e. gate code, dog, etc."/>
      </form>
    </div>
  )
}

export default InfoForm