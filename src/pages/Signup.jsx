import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setNotifyContext } from '../components/Notify';

import validator from 'validator';

import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { auth } from '../firebase/config';

import './pagesstyles/signup.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useCreateUserDb from '../customhooks/useCreateUserDb';

function Signup() {

  const [ email,setEmail ] = useState('');
  const [ password,setPassword ] = useState('');
  const [ rpassword,setRPassword ] = useState('');

  const [ errEmail,setErrEmail ] = useState('');
  const [ errPassword,setErrPassword ] = useState('');

  const notification = useContext(setNotifyContext);

  const navigate = useNavigate();

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

  const validatRPassword = (e) => {
    const rpassword = e.target.value;

    if(rpassword === password)
    {
      setRPassword(rpassword);
      setErrPassword('');
    }
    else if(rpassword === '')
    {
      setErrPassword('');
      setRPassword(''); 
    }
     
    else
      setErrPassword('Please, Enter the same password as above')
  }

  

  const signUpUser = async (e) => {   
    e.preventDefault();  
      try {
        const dbstatus = await useCreateUserDb(email,password);
        /* console.log(dbstatus); */
        if(dbstatus.flag === 'success')
        {
          await(createUserWithEmailAndPassword(auth,email,password));
          notification('success','Signed In Successfully')
          localStorage.setItem('userid',email);
          localStorage.removeItem('navvalue');
          navigate('/home'); 
        }
        else{
          throw new Error('Failed to create user database');
        }
        
      } catch (err) {
        notification('error',`${err.message}`);
        notification('error','Signed In Failed');
      }
  }


  return (
    <div id='main_signup_cont'>
        <header>Create Account</header>
        <form id='signup_form'>
            <input type="text" placeholder='Enter email' onChange={(e) => validateEmail(e)}/>
            <span>{errEmail}</span>
            <input type="password" placeholder='Enter password' onChange={(e) => validatePassword(e)}/>
            <span>{errPassword}</span>
            <input type="password" placeholder='Re-enter password' onChange={(e) => {validatRPassword(e)}}/>
            <button type='button' disabled={email !== '' && rpassword !== '' ? false : true} onClick={(e) => signUpUser(e)}>Submit</button>
            <label>Already have an account ? <Link to='/login' style={{color:'#B5DF53'}}>Login</Link></label>
        </form>
    </div>
  )
}

export default Signup;