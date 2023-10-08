import React,{ useContext, useEffect, useRef, useState } from 'react'

import ReactHTMLParser from 'html-to-react';

import { motion } from 'framer-motion';

import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Loader from '../../components/Loader';

import person from '../../assets/images/reviewer1.jpg'

import './blogpagesstyles/viewer.css'
import { setNotifyContext } from '../../components/Notify';


const Viewer = () => {

    const [ name,setName ] = useState('');
    const [ publish,setPublish ] = useState('');
    const [area,setArea] = useState('');
  
    const [ jsxElement,setJsxElement ] = useState('');
    const [ loading,setLoading ] = useState(true);
    const [ isPulsing1,setIsPulsing1 ] = useState(false);
    const [ isPulsing2,setIsPulsing2 ] = useState(false);
    const [ isPulsing3,setIsPulsing3 ] = useState(false);
    const [ isPulsing4,setIsPulsing4 ] = useState(false);

    const notification = useContext(setNotifyContext);

    const { id } = useParams();
    const blogid = useRef(id);

    const handleLike = async () => {
        setIsPulsing1(true);
        setTimeout(() => setIsPulsing1(false),300);
        const post_1 = collection(db,"blogs_col","blogscollection","post_1");
        const mainblogref = doc(post_1,`${blogid.current}`);

        try{
            const mainblog = await getDoc(mainblogref);
            if(mainblog.exists())
            {   
                await updateDoc(mainblogref,{
                    likes:increment(1),
                });

                notification('success','Successfully Liked Blog');
            }
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    const handleViews = async () => {

        setIsPulsing3(true);
        setTimeout(() => setIsPulsing3(false),300);
        const post_1 = collection(db,"blogs_col","blogscollection","post_1");
        const mainblogref = doc(post_1,`${blogid.current}`);

        
        try{
            const mainblog = await getDoc(mainblogref);
            
            if(mainblog.exists())
            {
                await updateDoc(mainblogref,{
                    views:increment(1),
                });
                notification('success','Updated View Counter');
            }
        }
        catch(err)
        {
            console.log(err.message);
         }

    }
    const handlePin = async () => {
        setIsPulsing2(true);
        setTimeout(() => setIsPulsing2(false),300);
        const pinblogs = collection(db,"user_col",`${localStorage.getItem('userid')}`,"pinblogs");
        const pinblogref = doc(pinblogs,`${blogid.current}`);

        const post_1 = collection(db,"blogs_col","blogscollection","post_1");
        const blogref = doc(post_1,`${blogid.current}`);
        try{
            const pinblog = await getDoc(pinblogref);
            const blog = await getDoc(blogref);
            if(!pinblog.exists())
            {
                await setDoc(pinblogref,{
                    title:blog.data().title,
                    img:blog.data().image,
                })
                notification('success','Successfully Pinned Blog to Archives');
            }
            else{
                notification('error','Already Pinned Blog');
            }
        }
        catch(err)
        {
            console.log(err.message);
        }

    }
    const handleFollow = async () => {
        setIsPulsing4(true);
        setTimeout(() => setIsPulsing4(false),300);
    }    
  useEffect(() => {
    const getBlogContent = async () => {
        console.log(blogid.current);
        const post_1 = collection(db,"blogs_col","blogscollection","post_1");
        const blogref = doc(post_1,`${blogid.current}`);

        const userinfo = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userinfo");
        
        try{
            const blog = await getDoc(blogref);
            const info = await getDocs(userinfo);
            if(blog.exists())
            {
                setPublish(blog.data().publish);
                setName(blog.data().blogger);
                const htmlstring = `${blog.data().content}`;
                const htmlparser = new ReactHTMLParser.Parser();
                setJsxElement(htmlparser.parse(htmlstring));
                setTimeout(() => setLoading(false),300);
            }
            if(!info.empty)
            {
                info.forEach((item) => {item.data().city && setArea(item.data().city+","+item.data().state+","+item.data().Country)});
            }
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    getBlogContent();
  },[])

  return (

    <div id='main_viewer_cont'>
        {
            loading ?
            <Loader msg={'Loading Blog Viewer'}/> :
            <div id='viewer_cont'>
                <section id='blog_info_container'>
                <section id='blogger_info'>
                <figure id='blogger_profile_cont'>
                    <img src={person} alt="" />
                </figure>

                <section id='blogger'>
                    <label id='blogger_name'>{name}</label>
                    <label className='blogger_misc'>{area}</label>
                    <label className='blogger_misc'>{`Date Pub: ${publish}`}</label>
                </section>
                </section>

                <section id='blogbtns'>
                <motion.button 
                        whileTap={{scale:0.95}}
                        animate={{scale: isPulsing1 ? 1.02 : 1}}
                        transition={{duration:0.3, ease:'linear'}}
                        onClick={handleLike}
                        style={{
                            boxShadow: isPulsing1
                              ? '0 0 5px 2px #122832'
                              : '0 0 0 0 #122832',
                        }}                  
                        >Like<i className="ri-thumb-up-fill"></i>
                </motion.button>
                <motion.button 
                        whileTap={{scale:0.95}}
                        animate={{scale: isPulsing2 ? 1.02 : 1}}
                        transition={{duration:0.3, ease:'linear'}}
                        onClick={handlePin}
                        style={{
                            boxShadow: isPulsing2
                              ? '0 0 5px 2px #122832'
                              : '0 0 0 0 #122832',
                        }}                  
                        >Pin<i className="ri-pushpin-fill"></i>
                </motion.button>
                <motion.button 
                        whileTap={{scale:0.95}}
                        animate={{scale: isPulsing3 ? 1.02 : 1}}
                        transition={{duration:0.3, ease:'linear'}}
                        onClick={handleViews}
                        style={{
                            boxShadow: isPulsing3
                              ? '0 0 5px 2px #122832'
                              : '0 0 0 0 #122832',
                        }}                  
                        >Views<i className="ri-eye-fill"></i>
                </motion.button>
                <motion.button 
                        whileTap={{scale:0.95}}
                        animate={{scale: isPulsing4 ? 1.02 : 1}}
                        transition={{duration:0.3, ease:'linear'}}
                        onClick={handleFollow}
                        style={{
                            boxShadow: isPulsing4
                              ? '0 0 5px 2px #122832'
                              : '0 0 0 0 #122832',
                        }}                  
                        >Follow<i className="ri-user-follow-fill"></i>
                </motion.button>
                </section>
                </section>

                <span id='stroke'></span>

                <section id='blog_content_container'>
                    {jsxElement}
                </section>
            </div>
        }
    </div>    
  )
}

export default Viewer