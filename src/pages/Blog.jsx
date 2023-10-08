import React, { useState,useContext } from 'react'

import { db } from '../firebase/config';
import { getDocs,collection } from 'firebase/firestore';


import { setNotifyContext } from '../components/Notify';

import BlogPost from './blogpages/blogpagescomponents/BlogPost';

import './pagesstyles//blog.css';
import { useEffect } from 'react';
import Loader from '../components/Loader';


function Blog() {

 const [ filterbloglist,setFilterBlogList ] = useState([]);
 const [ bloglist,setBloglist ] = useState([]);
 
 const [ searchInput,setSearchInput ] = useState('');

 const [ loading,setLoading ] = useState(true);

 const notification = useContext(setNotifyContext);


 const blogsref = collection(db,"blogs_col","blogscollection","post_1");


const filter = () => {
    if(searchInput)
    {
        
        let tempbloglist = filterbloglist;
        tempbloglist = tempbloglist.filter((blog) => {
            return ((blog.data().title).includes(searchInput));
        })
        setFilterBlogList(tempbloglist);
    }
    else{
        setFilterBlogList(bloglist);
        notification('error','Enter keywords to search');
    }
}

 useEffect( () => {
    const getBlogPosts = async () => {
        try {
            const blogposts = await getDocs(blogsref);
            const blogpostarr = [];
            blogposts.forEach(blogpost => {
                blogpostarr.push(blogpost);
            })
                setFilterBlogList(blogpostarr);
                setBloglist(blogpostarr);
                setTimeout(() => setLoading(false),200);
        } catch (error) {
            console.log(error.message);
        }
     }
     getBlogPosts();
    }
    ,[])

  return (
    <div id='main_blog_cont' style={{display:loading ? 'block' : ''}}>
        {
        loading ? 
        <Loader msg='Loading Blogs'/> :
        <>
        <section id='blog_search_cont'>
            <input type="text" placeholder='Enter title, tag, blogger' onChange={(e) => setSearchInput(e.target.value)}/>
            <button onClick={filter}><i className="ri-search-line"></i></button>
        </section>
        <section id='blog_cont'>
        {
            filterbloglist.map((blog) => {
                return <BlogPost key={blog.id} id={blog.id} blogdata={blog.data()} navigateTo="viewer"></BlogPost>
            })
        }
        </section>
        </>
        }
    </div>
  )
}

export default Blog;