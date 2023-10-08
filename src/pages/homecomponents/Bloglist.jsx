import React from "react";
import Slider from "react-slick";

import Blogcard from "./Blogcard";
import './homecomponentsstyles/bloglist.css';

import python from '../../assets/images/pythonlogo.jpg';
import ai from '../../assets/images/ai.jpg'
import bitcoin from '../../assets/images/bitcoin.jpg'
import vr from  '../../assets/images/vr.jpg'
import { motion } from "framer-motion";

const bloglist = [
  {
      img:{python},
      title:'Pyhton Language Of Future',
      desc:"Python's versatility and ease of use make it the driving force behind tech innovations. From artificial intelligence to web development",
      blogger:'Mark Thompson',
      views:'290',
      likes:'30',
  },
  {
      img:{vr},
      title:'Transforming Realities',
      desc:"Virtual reality (VR) is revolutionizing how we experience the world. From gaming to education and healthcare, VR immerses users in digital",
      blogger:'Elizabeth Walker',
      views:'100',
      likes:'70',
  },
  {
      img:{ai},
      title:'Unlocking the Power of AI',
      desc:"Artificial Intelligence (AI) is revolutionizing industries, from healthcare to finance. Discover how AI's machine learning and deep learning algorithms",
      blogger:'Jay Rathod',
      views:'2290',
      likes:'100',
  },
  {
      img:{bitcoin},
      title:'Bitcoin: Digital Gold Curse or Boon',
      desc:"Bitcoin, the pioneer of cryptocurrencies, continues to redefine finance. Its decentralized nature and limited supply have attracted investors worldwide.",
      blogger:'Erik Johansson',
      views:'340',
      likes:'50',
  },
  
]

const Backward = (props) => {
  const { className, style, onClick } = props;

  return (
    <i 
      className='ri-arrow-left-s-line'
      style={{ ...style, display: "block",color:'#B5DF53',position:'absolute',top:'50%',left:'-33px',fontSize:'35px',fontWeight:'500'}}
      onClick={onClick}
    >
    </i>
  );
}

const Forward = (props) => {
  const { className, style, onClick } = props;
  return (
    <i
    className="ri-arrow-right-s-line"
      style={{ ...style, display: "block",color:'#B5DF53',position:'absolute',top:'50%',right:'-33px',fontSize:'35px',fontWeight:'500'}}
      onClick={onClick}
    >
    </i>
  );
}
const settings = {
  infinite:'true',
  draggable:'true',
  arrows:'true',
  slidesToShow: 3,
  slidesToScroll: 1,
  speed:1000,
  autoplay: 'true',
  autoplaySpeed:2000,
  cssEase:'linear',
  pauseOnHover:'true',
  prevArrow:<Backward/>,
  nextArrow:<Forward/>,
}

export default function SimpleSlider() {
  
  const removeStyle = () => {
    const slide = document.getElementsByClassName('slick-slide');

    for (let i = 0; i < slide.length; i++)
    {
      slide[i].firstElementChild.firstElementChild.removeAttribute('style');
    }

  }

  return (
    <div>
      <Slider {...settings} responsive={[{breakpoint:1024,settings:{slidesToShow:2}},{breakpoint:714,settings:{dots:true,slidesToShow:1}}]} style={{width:'calc(100vw - 100px)',margin:'0 auto',}} onInit={removeStyle}>
        {
          bloglist.map((item,index) => {
            return <motion.div
                    whileTap={{scale:1.05}}
                    whileHover={{scale:1.05}}
                    key={index}>
                    <Blogcard blog={item}/>
                    </motion.div>

            
          })
        }
      </Slider>
    </div>
  );
}