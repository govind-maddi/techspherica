import React from 'react'

const buttonstyles = {
  backgroundColor:'#B5DF53',
  color:'#071418',
  fontSize:'16px',
  textAlign:'center',
  width:'100px',
  border:'none',
  padding:'0.3rem 0px',
  fontWeight:'500',
  fontFamily: 'Inter',
  marginLeft:'4px',
}

// eslint-disable-next-line react/prop-types
function Button({value}) {
  return (
    <button style={buttonstyles}>{value}</button>
  )
}

export default Button;