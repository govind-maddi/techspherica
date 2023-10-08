import React from 'react'
import { db } from '../firebase/config'
import { collection,setDoc,doc,addDoc } from 'firebase/firestore'

import { encrypt, decrypt } from 'text-encrypter';

export default function useCreateUserDb(id,password)
{
    console.log(id);
    const userref = doc(db,"user_col",`${id}`);
    const userinfo = collection(userref,"userinfo");

    const userblogs = collection(userref,"userblogs");
    const sampleblog = doc(userblogs,"sampleblog");

    const userdrafts = collection(userref,"userdrafts");
    const sampleblogdraft = doc(userdrafts,"sampleblogdrafts");

    const pinblogs = collection(userref,"pinblogs");
    const samplepin = doc(pinblogs,"samplepin");

    const userstats = collection(userref,"userstats");
    const stats = doc(userstats,"stats");

    const createUserinfo = async () => {
        try{
            await addDoc(userinfo, {
                name:'',
                password:`${encrypt(password,4,true)}`,
                emailid:id,
                city:'',
                state:'',
                country:'',
                profilepic:'',
              });
              await setDoc(sampleblog,{value:'this doc is just created for testing'});
              await setDoc(sampleblogdraft,{value:'this draft is just created for testing'});
              await setDoc(samplepin,{value:'this draft is just created for testing'});
              await setDoc(stats,{totalblogswritten:0,totalblogsread:0,lasttimeactive:''});

              return { flag:'success'};
        }
        catch(err)
        {
            console.log(err.message);
            return { flag:'error'};
        }
    }
    return createUserinfo();
}


