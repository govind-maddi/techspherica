import React, { useState,useRef } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

import { collection,doc,setDoc,getDoc } from 'firebase/firestore'

import { db,storage } from '../../firebase/config'
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage'

import './blogpagesstyles/write.css'
import { useEffect } from 'react';
import { useContext } from 'react'
import { setNotifyContext } from '../../components/Notify'


function Write() {

  const [ newblogbox,setNewBlogBox ] = useState(false);  
  const [ title,setTitle ] = useState('');
  const [ name,setName ] = useState('');
  const [ tag,setTag ] = useState('');
  const [ img,setImg ] = useState(null);
  const [ caption,setCaption ] = useState('');
  const [ imgurl,setImgUrl ] = useState('');
  const [ newblogerror,setNewBlogError ] = useState('');

  const notification = useContext(setNotifyContext);

  const fileref = useRef(null);
  const filename = useRef(null);

  const [ imgLoading,setImgLoading ] = useState(false);

  const navigate = useNavigate();

  const setBlogBoxStyle = {
    opacity:newblogbox ? '1' : '',
    transform:newblogbox ? 'translate(-50%,-50%) scale(1)' : '',
  }

  const uploadImage = () => {
    if(fileref.current)
        fileref.current.click();
  }

  const createNewBlog = async () =>{
    if(title&&imgurl&&caption&&tag&&name)
    {
        setNewBlogError('');
        
      const userid = localStorage.getItem('userid');
      const userblogs = collection(db,'user_col',userid,"userblogs");

      const post_1 = collection(db,"blogs_col","blogscollection","post_1");
      try{
        const blogref = doc(userblogs,`${title}`);
        const blog = await getDoc(blogref);

        const mainblogref = doc(post_1,`${title}`);
        const mainblog = await getDoc(mainblogref);
        if(!blog.exists() && !mainblog.exists())
        {
          await setDoc(blogref,{
            title:title,
            blogger:name,
            image:imgurl,
            id:userid,
            content:'',
            caption:caption,
            likes:0,
            likelimit:0,
            views:0,
            publish:`${(new Date).toLocaleDateString()}`,
            tag:tag,
          });

          await setDoc(mainblogref,{
            title:title,
            blogger:name,
            image:imgurl,
            id:userid,
            content:'',
            caption:caption,
            likes:0,
            likelimit:0,
            views:0,
            publish:`${(new Date).toLocaleDateString()}`,
            tag:tag,
          })

          notification('success','Successfully Created Blog Document');
          navigate(`/blog/write/newBlog/${title}`)
        }
        else{
            notification('error','Blog already exists goto archives to edit');
          console.log('hi'); 
        }

      }
      catch(err)
      {
        console.log(err.message);
      }
    }
    else{
        setNewBlogError("title and img can't be empty");
    }
  }

  const handleChange = (e) => {
    filename.current = e.target.files[0].name;
    setImg(e.target.files[0]);
  }

  useEffect(() => {
    const upload = () => {
        setImgLoading(true);
        const selectedFile = new FormData();
        selectedFile.append('file',img);
        const storageRef = ref(storage,`${filename.current}cover`);
      
        uploadBytes(storageRef, img).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(storageRef).then((url) => {
              setImgUrl(url)
              setImgLoading(false);
            }); 
        }).catch((err) => console.log(err.message));
    }

    if(filename.current)
        upload();
  },[img]);

  return (
    <div id='main_write_cont'>
        <section
        id='writeblog_tab'>
            <header>Create Blog</header>
            <span></span>
            <motion.section  whileHover={{scale:1.02}} whileTap={{scale:1.02}}>
                {/* <Link to='/blog/write/newblog'> */}<i className="ri-file-add-fill" onClick={() => setNewBlogBox(true)}></i>  
            </motion.section>
        </section>

        <section id='recentblog'>
            <header>Your Recent Blogs</header>
            <span></span>
           <div id='recentblog_list'>
            <motion.section whileHover={{scale:1.02}} whileTap={{scale:1.02}}>
                <p>Title</p>
            </motion.section>
            <motion.section whileHover={{scale:1.02}} whileTap={{scale:1.02}}>
                <p>Title</p>
            </motion.section>
            <motion.section whileHover={{scale:1.02}} whileTap={{scale:1.02}}>
                <p>Title</p>
            </motion.section>
            <motion.section whileHover={{scale:1.02}} whileTap={{scale:1.02}}>
                <p>Title</p>
            </motion.section>
           </div>
        </section>

        <section id='newblog_dialogbox' style={setBlogBoxStyle}>
            <header>New Blog</header>
            <i className="ri-close-line closebtn" onClick={() => setNewBlogBox(false)}></i>
            <section id='titleimgupload_cont'>
                <input type="text" placeholder='Enter Blog Title' onChange={(e) => setTitle(e.target.value)}/>
                <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder='Enter Tag' onChange={(e) => setTag(e.target.value)}/>
                <input type="text" placeholder='Enter Caption' onChange={(e) => setCaption(e.target.value)}/>
                <input type="text" placeholder='Enter img link or Upload Img' value={imgurl}/>
                <input type="file" ref={fileref} style={{display:'none'}} onChange={handleChange}/>
                {
                  imgLoading ? 
                  <><span className="uploadimgloader"></span></> :
                  <><button onClick={uploadImage}><i className="ri-image-add-fill"></i></button></>
                }
            </section>
            <span style={{color:'#fffafb',fontSize:'14px',fontWeight:'400',display:'block',marginBottom:'10px'}}>{newblogerror}</span>
            <button onClick={createNewBlog}>Create</button>
        </section>
    </div>
  )
}

export default Write