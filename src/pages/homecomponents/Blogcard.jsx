/* eslint-disable react/prop-types */
import React,{ useState } from 'react'

import { motion } from 'framer-motion';

import ai from '../../assets/images/ai.jpg'
import './homecomponentsstyles/blogcard.css'


function Blogcard({blog}) {
  return (
    <>
        <section className='blogcard_img'>
            <img src={ai} alt={blog.title} />
        </section>
        <section className='blogcard_info'>
            <header>{blog.title}</header>
            <article>{blog.desc}</article>
        </section>
        <section className='blogcard_stats'>
            <span className='blogger'>{blog.blogger}</span>
            <span className='stats'><i className="ri-thumb-up-line"></i>{blog.views}</span>
            <span className='stats'><i className="ri-eye-fill"></i>{blog.likes}</span>
        </section>

        <span className='blogcard_info_line'></span>
        <motion.span whileTap={{scale:1.04,fontWeight:500}} whileHover={{scale:1.04,fontWeight:500}} className='readmore_btn'>Read More <i className="ri-more-fill" style={{height:'8px'}}></i></motion.span>

    </>
  )
}

export default Blogcard;