import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";



const Cardslider = () => {
  const [nav1, setNav1] = useState();

  // i dont seem to need this
  //useEffect(() => {
  //    setNav1(sliderEl1);
  //    setNav2(sliderEl2);
  //  }, []);

  return (
    <div style={{ padding: "0 30px", background: "#ccc" }}>
      <Slider slidesToShow={5} slidesToScroll={1} swipe={true} infinite={true} autoplay={true} pauseOnHover={true} autoplaySpeed={2000} speed={1000} draggable={true} cssEase="linear" arrows={true}>
        <div>
          <h3 style={{textAlign:'center'}}>1</h3>
        </div>
        <div>
          <h3 style={{textAlign:'center'}}>2</h3>
        </div>
        <div>
          <h3 style={{textAlign:'center'}}>3</h3>
        </div>
        <div>
          <h3 style={{textAlign:'center'}}>4</h3>
        </div>
        <div>
          <h3 style={{textAlign:'center'}}>5</h3>
        </div>
        <div>
          <h3 style={{textAlign:'center'}}>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default Cardslider;
