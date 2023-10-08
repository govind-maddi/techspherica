import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import { CSSTransition,TransitionGroup } from 'react-transition-group';

import ProtectedRoutes from './ProtectedRoutes';

import Home from '../pages/Home';

import Blog from '../pages/Blog';
import Write from '../pages/blogpages/Write';
import Editor from '../pages/blogpages/Editor';
import Archives from '../pages/blogpages/Archives';
import Viewblog from '../pages/blogpages/Viewblog';
import Blogger from '../pages/blogpages/Blogger';

import Profile from '../pages/Profile';

import About from '../pages/About';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Viewer from '../pages/blogpages/Viewer';
import UserViewer from '../pages/blogpages/UserViewer';
import ForgotPassword from '../pages/ForgotPassword';

import './routers.css';

function Routers() {
  return (
    <TransitionGroup>
      <CSSTransition 
       key={location.key}
       classNames="page"
       timeout={300}
       > 
        <Routes>

          <Route path='/' element={<Navigate to='home'/>}></Route>

          <Route path='/home' element={<Home/>}>
            <Route path='hero'></Route>
            <Route path='toppicks'></Route>
            <Route path='trending'></Route>
          </Route>

          <Route path='/blog'>
            <Route index element={<Blog/>}/>
            <Route path='posts'>
              <Route index element={<Blog/>}></Route>
              <Route path=':post' element={<Viewblog/>}></Route>
              <Route path='blogger/:name' element={<Blogger/>}></Route>
            </Route>

            <Route path='write'>
            <Route index element={<ProtectedRoutes Comp={Write}/>}/>
            <Route path='newblog/:title' element={<ProtectedRoutes Comp={Editor}/>}/>
            </Route>

            <Route path='view/:id' element={<ProtectedRoutes Comp={Viewer}/>}></Route>
            <Route path='userview/:id' element={<ProtectedRoutes Comp={UserViewer}/>}></Route>

            <Route path='archives'>
              <Route index element={<ProtectedRoutes Comp={Archives}/>}></Route>
              <Route path='editblog/:title' element={<ProtectedRoutes Comp={Editor}/>}/>
            </Route>
          </Route>

          <Route path='/profile' element={<ProtectedRoutes Comp={Profile}/>}>
              <Route path='info'></Route>
              <Route path='pinned_blogs'></Route>
              <Route path='delete'></Route>
          </Route>

          <Route path='/about' element={<About/>}></Route>

          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route> 
          <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Routers;