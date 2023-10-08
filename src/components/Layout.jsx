import React, { useState } from 'react'
import Routers from '../routers/Routers';
import Footer from './Footer';
import Header from './Header';
import ScrollToHashElement from './ScrollToHashElement';
import Notify from './Notify';
import Loader from './Loader';


function Layout() {


  
  return (
    <>
      <ScrollToHashElement />
        <Notify>
          <Header/>       
              <Routers/>
          <Footer/>
        </Notify>
    </>
  )
}

export default Layout;