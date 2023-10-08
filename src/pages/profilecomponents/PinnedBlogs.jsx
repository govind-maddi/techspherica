import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { db } from '../../firebase/config'
import { useState } from 'react'

import ai from '../../assets/images/ai.jpg';

import './pinnedblogs.css'

function PinnedBlogs({pinblogdata}) {

  return (
      <div className='pinblog_cont'>
      <figure>
        <img src={pinblogdata.img} alt="" />
      </figure>
      <header>
        {pinblogdata.title}
      </header>
    </div>
    )
}

export default PinnedBlogs;