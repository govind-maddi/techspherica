import React, { useEffect, useRef,useState } from 'react'

import './styles/loader.css'

function Loader({msg}) {
  return (
    <>
    <div id='loadercont' >
          <span className="loader"></span><br></br>
          <label id='loadermsg'>{msg}</label>
    </div>
    </>
  )
}

export default Loader;