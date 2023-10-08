import React,{ useContext, useEffect, useRef, useState } from 'react'

import ReactHTMLParser from 'html-to-react';

import { motion } from 'framer-motion';

import { useNavigate, useParams } from 'react-router-dom';
import { collection, deleteDoc, doc, getDoc, getDocs, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Loader from '../../components/Loader';

import person from '../../assets/images/reviewer1.jpg'

import './blogpagesstyles/viewer.css'
import { setNotifyContext } from '../../components/Notify';


const UserViewer = () => {
  
    const [ name,setName ] = useState('');
    const [ publish,setPublish ] = useState('');
    const [area,setArea] = useState('');
  
    const [ jsxElement,setJsxElement ] = useState('');
    const [ loading,setLoading ] = useState(true);
    const [ isPulsing1,setIsPulsing1 ] = useState(false);
    const [ isPulsing2,setIsPulsing2 ] = useState(false);
    const [ isPulsing3,setIsPulsing3 ] = useState(false);

    const notification = useContext(setNotifyContext);

    const notflag = useRef(0);

    const { id } = useParams();
    const blogid = useRef(id);
    const title = localStorage.getItem('userid');
    const navigate = useNavigate();

    const handleEdit = async () => {
        setIsPulsing1(true);
        setTimeout(() => setIsPulsing1(false),300);
        navigate(`/blog/archives/editblog/${blogid.current}`);
    }
    const handleDelete = async () => {

        setIsPulsing2(true);
        setTimeout(() => setIsPulsing2(false),300);
        const post_1 = collection(db,"blogs_col","blogscollection","post_1");
        const mainblogref = doc(post_1,`${blogid.current}`);

        const userblogs = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userblogs");
        const blogref = doc(userblogs,`${blogid.current}`);

        const userdrafts = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userdrafts");
        const draftblogref = doc(userdrafts,`${blogid.current}draftblog`);

        notflag.current = 0;
        try{
            const mainblog = await getDoc(mainblogref);
            if(mainblog.exists())
            {
            await deleteDoc(mainblogref);
            notflag.current+=1;
            }
            
            const blog = await getDoc(blogref);
            if(blog.exists())
            {
              await deleteDoc(blogref);
              notflag.current+=1;
            }
        
            const draftblog = await getDoc(draftblogref);
            if(draftblog.exists())
            {
              await deleteDoc(draftblogref);
              notflag.current+=1;
            }
            if(notflag.current === 3){
              notification('success','Successfully Deleted Blog');
              setTimeout(() => navigate('/blog/archives'),500);
            }
             
            }      
            catch(err)
            {      
                console.log(err.message);
            }

    }
    const handleReset = async () => {
        setIsPulsing3(true);
        setTimeout(() => setIsPulsing3(false),300);
        notflag.current = 0;
        const post_1 = collection(db,"blogs_col","blogscollection","post_1");
        const mainblogref = doc(post_1,`${blogid.current}`);
        
        const userblogs = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userblogs");
        const blogref = doc(userblogs,`${blogid.current}`);
        
        const userdrafts = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userdrafts");
        const draftblogref = doc(userdrafts,`${blogid.current}draftblog`);

        try{
          const mainblog = await getDoc(mainblogref);
          if(mainblog.exists())
          {
          
          await updateDoc(mainblogref,{
            content:"",
          })
          notflag.current+=1;
          }
          
          const blog = await getDoc(blogref);
          if(blog.exists())
          {
            await updateDoc(blogref,{
              content:"",
            })
            notflag.current+=1;
          }
        
          const draftblog = await getDoc(blogref);
          if(draftblog.exists())
          {
            await updateDoc(draftblogref,{
                content:'',
            })
            notflag.current+=1;
          }
          if(notflag.current === 3){
            notification('success','Successfully Reset Blog Content');
            setTimeout(() => location.reload(),500);
          }
            
        }
        catch(err)
        {
          console.log(err.message);
        }

    }   
  useEffect(() => {
    const getBlogContent = async () => {
        const userblogs = collection(db,"user_col",`${title}`,"userblogs");
        const blogref = doc(userblogs,`${blogid.current}`);

        const userinfo = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userinfo");
        try{
            const blog = await getDoc(blogref);
            const info = await getDocs(userinfo);
            if(blog.exists())
            {
                setPublish(blog.data().publish);
                const htmlstring = `${blog.data().content}`;
                const htmlparser = new ReactHTMLParser.Parser();
                setJsxElement(htmlparser.parse(htmlstring));
                setLoading(false);
            }
            if(!info.empty)
            {
    
                info.forEach((item) => {console.log(item.data());setName(item.data().name);item.data().city && setArea(item.data().city+","+item.data().state+","+item.data().Country)});
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
                {console.log(name+"--"+area)}
                <section id='blogger'>
                    <label id='blogger_name'>{name}</label>
                    <label className='blogger_misc'>{area}</label>
                    <label className='blogger_misc'>{publish}</label>
                </section>
                </section>

                <section id='blogbtns'>
                <motion.button 
                        whileTap={{scale:0.95}}
                        animate={{scale: isPulsing1 ? 1.02 : 1}}
                        transition={{duration:0.3, ease:'linear'}}
                        onClick={handleEdit}
                        style={{
                            boxShadow: isPulsing1
                              ? '0 0 5px 2px #122832'
                              : '0 0 0 0 #122832',
                        }}                  
                        >Edit<i className="ri-pencil-line"></i>
                </motion.button>
                <motion.button 
                        whileTap={{scale:0.95}}
                        animate={{scale: isPulsing2 ? 1.02 : 1}}
                        transition={{duration:0.3, ease:'linear'}}
                        onClick={handleDelete}
                        style={{
                            boxShadow: isPulsing2
                              ? '0 0 5px 2px #122832'
                              : '0 0 0 0 #122832',
                        }}                  
                        >Delete<i className="ri-delete-bin-line"></i>
                </motion.button>
                <motion.button 
                        whileTap={{scale:0.95}}
                        animate={{scale: isPulsing3 ? 1.02 : 1}}
                        transition={{duration:0.3, ease:'linear'}}
                        onClick={handleReset}
                        style={{
                            boxShadow: isPulsing3
                              ? '0 0 5px 2px #122832'
                              : '0 0 0 0 #122832',
                        }}                  
                        >Reset<i className="ri-loop-left-line"></i>
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

export default UserViewer;