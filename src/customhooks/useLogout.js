import React from 'react'

import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { setNotifyContext } from '../components/Notify';

function useLogout() {

  return async () => {
    try {
      await signOut(auth);
      // Sign-out successful.
      return "success";
    } catch (error) {
      // An error happened during sign-out.
      return "error"; // You can customize this error message as needed.
    }
  }
}

export default useLogout;