import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import validator from 'validator';

import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './pagesstyles/login.css'
import { useContext } from 'react';
import { setNotifyContext } from '../components/Notify';

function Login() {

  const [ email,setEmail ] = useState('');
  const [ password,setPassword ] = useState('');

  const [ errEmail,setErrEmail ] = useState('');
  const [ errPassword,setErrPassword ] = useState('');

  const navigate = useNavigate();

  const notification = useContext(setNotifyContext);

  const validateEmail = (e) => {
    const email = e.target.value;

    if(validator.isEmail(email))
    {
      setEmail(email);
      setErrEmail('');
    }
    else if(email === '')
    {
      setErrEmail('');
      setEmail('');
    }
    else
      setErrEmail("Please, Enter Valid Email");

}

const validatePassword = (e) => {
  const password = e.target.value;
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]+$/;

  if(regex.test(password))
  {
    setPassword(password);
    setErrPassword('');
  }
  else if(password === '')
  {
    setErrPassword('');
    setPassword('');
  }
    
  else
    setErrPassword('Password should contain atleast one A-Z,a-z,0-9,_')
}

  const loginUser = async () => {
      try{
          await signInWithEmailAndPassword(auth,email,password);
          notification('success','Logged in Successfully');
          localStorage.setItem('userid',email);
          localStorage.removeItem('navvalue');
          navigate('/home');
      }
      catch(err)
      {
        console.log(err.message);
        notification('error','Logged in Failed');
      }
  }

  return (
    <div id='main_login_cont'>
        <header>Log In</header>
        <form id='login_form'>
            <input type="text" placeholder='Enter email' onChange={(e) => validateEmail(e)}/>
            <span>{errEmail}</span>
            <input type="password" placeholder='Enter Password' onChange={(e) => validatePassword(e)}/>
            <span>{errPassword}</span>
            <button type='button' disabled={email !== '' && password !== '' ? false : true} onClick={loginUser}>Login</button>
            <label>Don&apos;t have an account yet ? <Link to='/signup' style={{color:'#B5DF53'}}>Signup</Link></label>
            <label style={{color:'#B5DF53'}}>Forgot Password</label>
        </form>
    </div>
  )
}

export default Login