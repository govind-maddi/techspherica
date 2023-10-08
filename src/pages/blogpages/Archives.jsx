import React, { useEffect, useRef, useState,useContext } from 'react'

import Loader from '../../components/Loader';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import BlogPost from './blogpagescomponents/BlogPost';

import './blogpagesstyles/archives.css'
import { setNotifyContext } from '../../components/Notify';

function Archives() {

    const [ filterbloglist,setFilterBlogList ] = useState([]);
    const [ bloglist,setBloglist ] = useState([]);
 
    const [ searchInput,setSearchInput ] = useState('');
    const [ loading,setLoading ] = useState(true);

    const notification = useContext(setNotifyContext);


    const filter = () => {
        if(searchInput)
    {
        let tempbloglist = filterbloglist;
        tempbloglist = tempbloglist.filter((blog) => {
            console.log(blog.data().title);
            return ((blog.data().title).includes(searchInput));
        })
        setFilterBlogList(tempbloglist);
    }
    else{
        setFilterBlogList(bloglist);
        notification('error','Enter keywords to search');
    }
    }

    useEffect(() => {
        const getUserBlogs = async () => {            
            try{
                const userid = localStorage.getItem('userid');

                if(userid)
                {
                    const userblogs = collection(db,"user_col",`${userid}`,"userblogs");
                    const userblogpost = await getDocs(userblogs);
                    const userblogpostarr = [];

                    userblogpost.forEach((blog) => {
                        if(!blog.data().value)
                            userblogpostarr.push(blog);
                    });
                    setFilterBlogList(userblogpostarr);
                    setBloglist(userblogpostarr);
                    setLoading(false);
                }
                else{
                    setLoading(false);
                }
                
            }
            catch(err)
            {
                console.log(err.message);
                notification('error','Failed To Load Archives');
            }

        }
        getUserBlogs();
    },[])


    return (
        <div id='main_archive_cont'>
            { loading ? 
            <Loader msg='Loading Your Blogs'/> : 
            <>
            <section id='stats_cont'>
                <article>
                    <label>Total Blogs Written</label>
                    <span>{bloglist.length}</span>
                </article>
                <article style={{display:'none'}}>
                    <label>Total Blogs Read</label>
                    <span>20</span>
                </article>
                <article id='lastactive'>
                    <label>Last Active</label>
                    <span style={{color:'#fffafb'}}>{`${new Date().toLocaleDateString()}`}</span>
                </article>
            </section>

            <section id='blog_search_cont'>
                <input type="text" placeholder='Enter title, tag, blogger' onChange={(e) => setSearchInput(e.target.value)}/>
                <button onClick={filter}><i className="ri-search-line"></i></button>
            </section>
     
             <section id='blog_cont'>
             {
                 filterbloglist.map((blog) => {
                     return <BlogPost key={blog.id} id={blog.id} blogdata={blog.data()} navigateTo='userviewer'></BlogPost>
                 })
             }
             </section> 
            </>
            }

        </div>
      )
}

export default Archives