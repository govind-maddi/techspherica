import React,{ useState } from 'react'

const ForgotPassword = () => {

    const [ email,setEmail ] = useState('');
    const [ otp,setOTP ] = useState('');

  

  return (
    <div>
        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" onChange={(e) => setOTP(e.target.value)}/>
        <button onClick={sendOtp}>Send Otp</button>
        <button onClick={verifyOtp}>Verify</button>
    </div>
  )
}

export default ForgotPassword