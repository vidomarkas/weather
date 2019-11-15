import React from 'react'




export const sliderSettings = {
    dots:true,
    speed:200,
    slidesToShow:1,
    slidesToScroll:1,
    infinite: false,
   
    appendDots: dots => (
        <div
          style={{
            position:"absolute",
            top: 0,
            left: 0,
            height: "40px",
            borderRadius: "10px",
            padding: "10px"
          }}
        >
          <ul style={{ margin: "0px" }}> {dots} </ul>
        </div>
      ),
      // 
  }

  