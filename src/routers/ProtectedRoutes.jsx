/* eslint-disable react/prop-types */
import React from 'react'
import useAuth from '../customhooks/useAuth'

function ProtectedRoutes({Comp}) {

    const { currentuser } = useAuth();
  return (
    currentuser ? <Comp/> : <div style={{width:'100%',textAlign:'center',fontSize:'20px',fontWeight:'400',color:'#B5DF53',marginTop:'2rem'}}>Log In To Continue</div>
  )
}

export default ProtectedRoutes;