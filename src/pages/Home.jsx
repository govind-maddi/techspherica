import React from 'react'

import { motion } from 'framer-motion';

import Bloglist from './homecomponents/Bloglist';
import Reviews from './homecomponents/Reviews';

import techparticlesgif from '../assets/images/techparticles.gif'
import arrow from '../assets/images/right-arrow.png'


import './pagesstyles/home.css';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../components/Loader';
import { useEffect } from 'react';


function Home() {
  
  const [ laoding,setLoading ] = useState(true);  

  useEffect(() => {
    setTimeout(() => setLoading(false),2000);
  },[]);

  return (
    <div id="main_home_cont">
    {

        laoding ? 
        <Loader msg='Loading Tech Wonders'/> :
        <>
        <section id='hero'>
          <section id='hero_cont_headers'>
            <header>Discover, Explore, Share, <span style={{color:'#B5DF53'}}>Innovate</span> and Thrive</header>
            <article>
            Embark on a technical voyage. Innovate, share insights, lead boldly, thrive in our tech community.
            </article>
            <motion.button whileTap={{scale:1.02}} whileHover={{scale:1.02}}><span>Get Started</span> <img src={arrow}/></motion.button>
          </section>

          <section id='hero_cont_gif'>
            <img src={techparticlesgif} alt='techparticlesgif' />
          </section>
        </section>


        <section id='toppicks'>
          
          <header><span style={{color:'#B5DF53'}}>Unlock Inspiration</span> with Our Picks</header>
          <article>Discover boundless creativity and fresh perspectives in our <span style={{color:'#B5DF53'}}>Top Picks</span> section—a curated wellspring of inspiration awaits your exploration.</article>
          <Bloglist></Bloglist>
        </section>

        <section id='trending'>
          <header><span style={{color:'#B5DF53'}}>Dive Deep</span> into Trending Tales</header>
          <article>Exploring <span style={{color:'#B5DF53'}}>Trending Tales</span>, we uncover a world of captivating narratives, where reality meets imagination, endlessly fascinating.</article>
          <Bloglist></Bloglist>
        </section>

        <section id='reviews' style={{display:'none'}}>
          <header><span style={{color:'#B5DF53'}}>Your reviews,</span> your insights</header>
          <Reviews/>
        </section>
        </>
    }
    </div>
  )
}

export default Home;