import React, { useState } from 'react'

import ImageLoader from '../../../components/ImageLoader'; 

import { motion } from 'framer-motion';

import './blogpagecomponentstyles/blogpost.css'
import { useNavigate } from 'react-router-dom';
  

function BlogPost( { blogdata,id,navigateTo } ) {

  const [ imgLoader,setImgLoader ] = useState(true);
  const navigate = useNavigate();

  const disableImgLoader = () => {
    setImgLoader(false);
  }

  const boxShadowVariants = {
    hover: {
      boxShadow: `0 0 2px 2px #B5DF53`,
      y:-2,
      transition: {
        duration: 0.3,
      },
    },
    initial: {
      boxShadow: '0 0 0 0 #fffafb',
      y:0,
    },
  };

  const redirectTo = () => {
    if(navigateTo === "viewer")
      navigate(`/blog/view/${id}`);
    else
      navigate(`/blog/userview/${id}`);
  }

  return (
    <motion.div 
      initial="initial"
      whileHover='hover'
      whileTap='hover'
      variants={boxShadowVariants}
      className='postslist_cont' onClick={() => redirectTo()}>
            <section className='postlist_item'>
                <div className='postlist_tag'>{blogdata.tag}</div>
                <p style={{margin:'1rem 0'}} className='postlist_title'>{blogdata.title}</p>
                <p style={{margin:'1rem 0'}} className='postlist_info'>{blogdata.caption}</p>
                <div className='postlist_blogger'>
                    {/* <i className="ri-account-circle-fill"></i><label>{blogdata.blogger}</label> */}
                    <i className="ri-eye-fill"></i><label>{blogdata.views}</label>
                    <i className="ri-thumb-up-fill"></i><label>{blogdata.likes}</label>
                </div>
            </section>
            <figure className='postlist_imgcont'>
                {
                  imgLoader && <ImageLoader/> 
                }
                <img className='postlist_img' style={{opacity:imgLoader ? '0' : '1'}} src={blogdata.image} alt={blogdata.title} onLoad={disableImgLoader}/>
            </figure>
    </motion.div>
  )
}

export default BlogPost;

