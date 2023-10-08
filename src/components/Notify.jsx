import React,{ createContext, useEffect } from 'react'
import { ToastContainer,toast } from 'react-toastify';


export const setNotifyContext = createContext();

function Notify( {children} ) {
  
  const notify = (type,msg) => {
    if(type === 'success')
    {
        toast.success(msg,{
            position: 'top-right',
            });
    }
    else
    {
        toast.error(msg,{
            position: 'top-right',
            });
    }
    
  }

  return(
    <setNotifyContext.Provider value={notify}>
        <ToastContainer position='top-right'/>
        {children}
    </setNotifyContext.Provider>
  )
}

export default Notify;