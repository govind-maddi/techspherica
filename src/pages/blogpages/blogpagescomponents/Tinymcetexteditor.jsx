/* apiKey="mg0gkx45j3qmb0z0q71prwl0npookydv2qz20frruqk7izu0" */

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import Loader from '../../../components/Loader';

import './blogpagecomponentstyles/tinymcetexteditor.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { collection, doc, getDoc, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { setNotifyContext } from '../../../components/Notify';


export default function Tinymcetexteditor( { title } ) {
  const editorRef = useRef(null);
  const filename = useRef(null);
  const notflag = useRef(0);

  const [ loading,setLoading ] = useState(true);
  const [ imgurllist,setImgUrlList ] = useState([]);

  const [ img,setImg ] = useState(null);
  const fileinputref = useRef(null);
  
  const [ blogcontent,setBlogContent ] = useState('');
  const screenwidth = useRef(0);

  const notification = useContext(setNotifyContext);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };


  const handleChange = (e) => {
    filename.current = e.target.files[0].name;
    setImg(e.target.files[0]);
    console.log(filename.current)
  }

  const handleSubmit = () => {
    if(fileinputref.current)
      fileinputref.current.click();
  }


  const draftBlog = async () => {
    const userdrafts = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userdrafts");
    const draftblog = doc(userdrafts,`${title}draftblog`);
    console.log('checking if blog already exists')

    try{
    const blog = await getDoc(draftblog);
    if(!blog.exists())
    {
      console.log('creating blog')
        await setDoc(draftblog,{
          content:""+(editorRef.current.getContent()),
        })
        console.log('saved the content');
        notification('success','Successfully Saved Blog Draft');
    }
    else{
      console.log('blog already exists updating');
      await updateDoc(draftblog,{
        content:""+(editorRef.current.getContent()),
      })
      notification('success','Successfully Saved Blog Draft');
  }
    }
    catch(err)
      {
        console.log(err.message);
      }
}

  const postBlog = async () => {
    const post_1 = collection(db,"blogs_col","blogscollection","post_1");
    const mainblogref = doc(post_1,`${title}`);

    const userblogs = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userblogs");
    const blogref = doc(userblogs,`${title}`);

    const userdrafts = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userdrafts");
    const draftblogref = doc(userdrafts,`${title}draftblog`);

    notflag.current = 0;

    try{
      const mainblog = await getDoc(mainblogref);
      if(mainblog.exists())
      {
      await updateDoc(mainblogref,{
        content:''+editorRef.current.getContent(),
        likes:0,
        views:0,
      })
      notflag.current+=1;
      }
      
      const blog = await getDoc(blogref);
      if(blog.exists())
      {
      await updateDoc(blogref,{
        content:''+editorRef.current.getContent(),
        likes:0,
        views:0,
        })
        notflag.current+=1;
      }

      const draftblog = await getDoc(draftblogref);
      if(draftblog.exists())
      {
        await updateDoc(draftblogref,{
          content:''+editorRef.current.getContent(),
          })
          notflag.current+=1;
      }
      if(notflag.current === 3){
        notification('success','Successfully Posted Blog Content');
      }
        
    }
    catch(err)
    {
      console.log(err.message);
    }
  }
  
  const resetBlog = async () => {
    const post_1 = collection(db,"blogs_col","blogscollection","post_1");
    const mainblogref = doc(post_1,`${title}`);

    const userblogs = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userblogs");
    const blogref = doc(userblogs,`${title}`);

    const userdrafts = collection(db,"user_col",`${localStorage.getItem('userid')}`,"userdrafts");
    const draftblogref = doc(userdrafts,`${title}draftblog`);

    notflag.current = 0;
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
        editorRef.current.setContent('');
      }
        
    }
    catch(err)
    {
      console.log(err.message);
    }
  }

  useEffect(() => {
    const getDraftBlogContent = async () => {
      const userdrafts = collection(db,'user_col',`${localStorage.getItem('userid')}`,'userdrafts');
      const blogdoc = doc(userdrafts,`${title}draftblog`);
      
      try{
        const blog = await getDoc(blogdoc);
        if(blog.exists())
        {
            setBlogContent(blog.data().content);
        }
      }
      catch(err)
      {
        console.log(err.message);
      }
    }
    getDraftBlogContent();
    
    screenwidth.current = window.innerWidth;

  },[])

  useEffect(() => {
    const uploadImage = () => {
      console.log('begin upload');
      const selectedFile = new FormData();
      selectedFile.append('file',img);
      const storageRef = ref(storage,`${filename.current}`);
      
      uploadBytes(storageRef, img).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(storageRef).then((url) => setImgUrlList(prevImgUrlList => [...prevImgUrlList,url])); 
      }).catch((err) => console.log(err.message));
    }

    if(filename.current)
      uploadImage();

  },[img])

  return (
        <>  

        {
          loading && <Loader msg={'Loading Editor'}/>
        }
          <div id='editor_cont' style={{display:loading ? 'none' : ''}}> 
          <Editor
          apiKey='mg0gkx45j3qmb0z0q71prwl0npookydv2qz20frruqk7izu0'
          onInit={(evt, editor) => {editorRef.current = editor;setLoading(false)}}
          /* onPostRender={() => setLoading(false)} */
          initialValue={blogcontent}
          init={{
            
            height:600,
            placeholder:'Type Your Innovation Here',
            menubar: false,
            resize:false,
            mobile:true,
            toolbar_mode:(screenwidth.current > 768) ? 'wrap' : 'floating', 
            object_resizing:true,
            image_uploadtab: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              ' image link preview',
              skin_url:'/TechSpherica',
          }}
        />
        <section id='blog_btns'>
            <button onClick={draftBlog}>Save</button>
            <button onClick={postBlog}>Post</button>
            <button onClick={resetBlog}>Reset</button>
        </section>
        <section id='upload_cont'>
          <header>Your Uploads</header>
          <input type="file" style={{display:'none'}} ref={fileinputref} onChange={handleChange}/>
          <button className='uploadbtn' onClick={handleSubmit}>Upload</button>
          <button className='uploadbtn' onClick={() => setImgUrlList([])}>Clear</button>
          <section id='urls'>
            <ul>
              { imgurllist.map((url) => <li style={{listStyleType:'disc'}} key={url}>{url}</li>) }
            </ul>
          </section>
        </section>
        </div>
         
        </>
        )
      }