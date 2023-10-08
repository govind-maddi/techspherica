import React, { useContext } from 'react'

import PinnedBlogs from './profilecomponents/PinnedBlogs';

import defaultprofilepic from '../assets/images/defaultprofilepic1.jpg';

import { decrypt } from 'text-encrypter';

import { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { useRef } from 'react';
import { setNotifyContext } from '../components/Notify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import './pagesstyles/profile.css'


function Profile() {

  const [imgsrc,setImgSrc] = useState(false);
  const [ name,setName ] = useState('');
  const [ email,setEmail ] = useState('');
  const [ password,setPassword ] = useState('');
  const [ city,setCity ] = useState('');
  const [ state,setState ] = useState('');
  const [ country,setCountry ] = useState('');

  const [file,setFile] = useState('');
  const fileinputref = useRef();

  const notification = useContext(setNotifyContext);

  const [pinblogarr,setPinBlogArr] = useState([]);

  const defaultProfilePic = useRef(defaultprofilepic);

  const editProfile = async () => {
    const userinfo = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userinfo");

    try{
      const info = await getDocs(userinfo);
      if(!info.empty)
      {
        info.forEach(async(profile) => {
          await updateDoc(profile.ref,{
            name:name,
            city:city,
            Country:country,
            state:state,
          })
          
        })
        notification('success','Successfully Updated Profile');
      }

    }
    catch(err)
    {
      console.log(err.message);
    }
  }

  const handleChange = async () => {
    fileinputref.current.click();
  }

  const putUrl = async (url) => {
    const userinfo = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userinfo");
      try {
      const info = await getDocs(userinfo);
      if(!info.empty)
      {
        info.forEach(async(doc) => {
          const docref = doc.ref;
          await updateDoc(docref,{
            profilepic:url,
          });
        })
        setImgSrc(url);
        notification('success','Updated ProfilePic Successfully');
        
  }
}
catch(err)
{
  console.log(err.message);
}
  }

  useEffect(() => {
    const uploadImg = async () => {
      const selectedFile = new FormData();
      selectedFile.append('file',file);
      const storageRef = ref(storage,`userprofilepic`);

      uploadBytes(storageRef,file).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          console.log(url);
          putUrl(url);
        }) 
      }).catch((err) => console.log(err.message))
    }
    console.log(file);
    if(file.name)
      uploadImg();
  },[file])

  useEffect(() => {
    const getProfile = async () => {
      const userinfo = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userinfo");
      try {
      const info = await getDocs(userinfo);
      if(!info.empty)
      {
        info.forEach((doc) => {
          setName(doc.data().name);
          setPassword(decrypt(doc.data().password,4,true));
          setEmail(doc.data().emailid);
          setCity(doc.data().city);
          setState(doc.data().state);
          setCountry(doc.data().Country);
          if(doc.data().profilepic !== ''){
            defaultProfilePic.current = doc.data().profilepic;}
        })
      }
    } catch (err) {
      console.log(err.message);
    }
    }

    const getPinBlogs = async () => {
      const pinblogs = collection(db,"user_col",`${localStorage.getItem('userid')}`,"pinblogs");
      try {
        const pinblogref = await getDocs(pinblogs);
        const temp = [];
        if(!pinblogref.empty)
        {
          
          pinblogref.forEach((pinblog) => {
            if(!pinblog.data().value)
              temp.push(pinblog);
          })
          setPinBlogArr(temp);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getProfile();
    getPinBlogs();
  },[])

  return (
    <div id='main_profile_cont'>
      <div id='info'>
        <figure id='profilepic_cont'>
          <img src={defaultProfilePic.current} alt="profilepic" />
          <input type="file" ref={fileinputref} style={{visibility:'hidden'}} onChange={(e) => setFile(e.target.files[0])}/>
          <button onClick={handleChange}>Change Image</button>
        </figure>

        <div id='prim_cont'>
            <section>
                <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value) }/>
            </section>

            <section>
              <input type="text" value={email}/>
            </section>

            <section>
                <input type="text" value={password}/>
            </section>
        </div>  

        <div id='sec_cont'>
            <section>
              <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value) }/>
            </section>

            <section>
              <input type="text" placeholder='State' value={state} onChange={(e) => setState(e.target.value) }/>
            </section>

            <section>
              <input type='text' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value) }/>
            </section>
        </div>        

      <section id='submitbtn'>
        <button onClick={editProfile}>Edit Profile</button>
      </section>

      </div>

      <div id='pinned_blogs'>
        <header>Pinned Blogs</header>
        {
          pinblogarr.map((pin) => {
            return <PinnedBlogs pinblogdata={pin.data()}/>
          })
        }
        {
        }
      </div>

      <div id='delete'>
        <section>
          <label>Do you want delete your account</label>
          <button>Delete</button>
        </section>
      </div>

    </div>
  )
}

export default Profile;