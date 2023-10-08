/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react';
import './styles/header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

import useAuth from '../customhooks/useAuth';

import logo from '../assets/images/logo.png'
import useLogout from '../customhooks/useLogout';
import { setNotifyContext } from './Notify';

const navlinks = [
  {
    home:[
      {
        path:'hero',
        display:'Hero',
        icon:'ri-home-7-fill'
      },
      {
        path:'toppicks',
        display:'Top Picks',
        icon:'ri-bard-fill'
      },
      {
        path:'trending',
        display:'Trending',
        icon:'ri-line-chart-fill'
      },
      {
        path:'reviews',
        display:'Reviews',
        icon:'ri-account-pin-box-fill'
      },
      {
        path:'contactus',
        display:'Contact Us',
        icon:'ri-mail-send-fill'
      }
    ],

    blog:[
      {
        path:'blog/posts',
        display:'Posts',
        icon:'ri-article-fill'
      },
      {
        path:'blog/write',
        display:'Write',
        icon:'ri-edit-box-fill'
      },
      {
        path:'blog/archives',
        display:'Archives',
        icon:'ri-file-copy-2-fill'
      },
    ],

    profile:[
      {
        path:'info',
        display:'Info',
        icon:'ri-user-settings-fill'
      },
      {
        path:'pinned_blogs',
        display:'Pinned Blogs',
        icon:'ri-pushpin-fill'
      },
      {
        path:'delete',
        display:'Delete',
        icon:'ri-delete-bin-fill'
      }
    ]
  }
]

function Header() {

  const [secondaryNavBar, setSecondaryNavbar] = useState([]);
  const [ toggleSecondaryNavbar, setToggleSecondaryNavbar] = useState(false);
  const [ secondaryValue,setSecondaryValue ] = useState();

  const [ mobilenavbar,setMobileNavbar ] = useState(false);

  const notification = useContext(setNotifyContext);
  const navigate = useNavigate();

  const { currentuser } = useAuth();

  const logout = async () => {
    const userLogout = useLogout();
    const type = await userLogout();
    if(type === 'success')
    {
      notification(type,'Logged Out Successfully');
      localStorage.removeItem('userid');
      localStorage.removeItem('navvalue');
      navigate('/home');
    }
      
    else
      notification(type,'Logged Out Failed');

  }

  const toggleMobileNavbar = () => {
    setToggleSecondaryNavbar(prevState => !prevState); 
  }

  const changeNavbar = () => {
    if(localStorage.getItem('navvalue') === 'home'){
      setSecondaryNavbar(navlinks[0].home);
      setMobileNavbar(navlinks[0].home);
      setSecondaryValue('home');
    }
      else if(localStorage.getItem('navvalue') === 'blog'){
      setSecondaryNavbar(navlinks[0].blog);
      setMobileNavbar(navlinks[0].blog)
      setSecondaryValue('');
      }
      else if(localStorage.getItem('navvalue') === 'profile'){
      setSecondaryNavbar(navlinks[0].profile);
      setMobileNavbar(navlinks[0].profile)
      setSecondaryValue('profile');
      }
      else{
        setSecondaryNavbar([]);
        setSecondaryValue('');
      }
      

  }


  useEffect(() => {
    if(localStorage.getItem('navvalue') === null)
    {
      setSecondaryNavbar(navlinks[0].home);
      setMobileNavbar(navlinks[0].home);
    }
      
    else
      changeNavbar();
  },[])

  return (
    <div id="main_cont_navbar">
      <figure id='logo_cont'>
        <img src={logo} alt={logo} />
      </figure>

      <section id='navbar_pc_links_1'>
        <ul id='navbar_pc_primary_list'>
          <li><NavLink to='home' onClick={() => {localStorage.setItem('navvalue','home');changeNavbar()}} className={(navClass) => navClass.isActive ? 'nav_active' : ''}>Home</NavLink></li>
          <li><NavLink to='blog' onClick={() => {localStorage.setItem('navvalue','blog');changeNavbar()}} className={(navClass) => navClass.isActive ? 'nav_active' : ''}>Blog</NavLink></li>
          
          {currentuser ? 
           <>
           <li><NavLink to='about' className={(navClass) => navClass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue','aboutus');changeNavbar()} }>About Us</NavLink></li>
           <li><NavLink to='profile' onClick={() => {localStorage.setItem('navvalue','profile');changeNavbar()}}  className={(navClass) => navClass.isActive ? 'nav_active' : ''}>Profile</NavLink></li>
           <li className='signup' onClick={() => {localStorage.setItem('navvalue','logout');changeNavbar();logout();}}>Logout</li>
           </>
           :
           <>
            <li><NavLink to='about' className={(navClass) => navClass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue','aboutus');changeNavbar()}}>About Us</NavLink></li>
            <li><NavLink to='login' className={(navClass) => navClass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue','login');changeNavbar()}}>Login</NavLink></li>
            <li className='signup'><NavLink to='signup' onClick={() => {localStorage.setItem('navvalue','signup');changeNavbar()}}>Sign Up</NavLink></li>
           </>

          }


        </ul>
      </section>

      {secondaryNavBar.length > 0 ? <section id='navbar_pc_links_2'>
           <ul id='navbar_pc_secondary_list'>
            {
              secondaryValue === 'home' || secondaryValue === 'profile' ? 
              secondaryNavBar.map((item,index) => {
                return <li key={index}><Link to={item.path} spy={true} smooth={true} offset={-70} duration={500} style={({ isActive }) => ({
                  color: isActive ? '#B5DF53' : '#fffafb',
                })}>
                  {item.display}
                  </Link></li>
              })
              :
              secondaryNavBar.map((item,index) => {
                return <li key={index}><NavLink to={item.path} style={({ isActive }) => ({
                  color: isActive ? '#B5DF53' : '#fffafb'
                })}>
                  {item.display}
                  </NavLink></li>
              })
            }
          </ul>
      </section> :
      <></>
      }

      <section id='ham_cont' >
        <i className={toggleSecondaryNavbar ? "ri-close-line" : "ri-menu-line"} onClick={toggleMobileNavbar}></i>
      </section>

      <section id='navbar_mobile_links_1' style={{visibility:toggleSecondaryNavbar && 'visible',opacity:toggleSecondaryNavbar && '1',transform:toggleSecondaryNavbar && 'scaleY(1)'}}>
        <ul>
          <li><NavLink to='home' className={(navclass) => navclass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue','home');changeNavbar();toggleMobileNavbar()}}>Home</NavLink></li>
          <li><NavLink to='blog' className={(navclass) => navclass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue','blog');changeNavbar();toggleMobileNavbar()}} >Blogs</NavLink></li>
          <li><NavLink to='aboutus' className={(navclass) => navclass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue','aboutus');changeNavbar();toggleMobileNavbar()}}>About Us</NavLink></li>

          {
            currentuser ? 
            <>
              <li><NavLink to='profile' className={(navclass) => navclass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue',"profile");changeNavbar();toggleMobileNavbar()}}>Profile</NavLink></li>
              <li><NavLink to='logout' className={(navclass) => navclass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue',"logout");changeNavbar();logout();toggleMobileNavbar()}}>Logout</NavLink></li>
            </> :
            <>
              <li><NavLink to='login' className={(navclass) => navclass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue',"login");changeNavbar();toggleMobileNavbar()}}>Login</NavLink></li>
              <li><NavLink to='signup' className={(navclass) => navclass.isActive ? 'nav_active' : ''} onClick={() => {localStorage.setItem('navvalue',"signup");changeNavbar();toggleMobileNavbar()}}>Sign Up</NavLink></li>
            </>
          }   
        </ul>
      </section>

      {secondaryNavBar.length > 0 ? <section id='navbar_mobile_links_2'>
        {
          secondaryValue === 'home' || secondaryValue === 'profile' ? 
          secondaryNavBar.map((item,index) => {
            return <li key={index}><Link to={item.path} spy={true} smooth={true} offset={-70} duration={500}>
              <i className={item.icon}></i>
              </Link></li>
          })
          :
          secondaryNavBar.map((item,index) => {
            return <li key={index}><NavLink to={item.path} style={({isActive}) => ({color: isActive ? '#B5DF53' : '#fffafb'})}>
              <i className={item.icon}></i>
              </NavLink></li>
          })
        }
      </section> : <></>
      }
      <span id='navbar_bottom_border'></span>

      <span id='loginrightstroke'></span>
    </div>

    
  )
}

export default Header;