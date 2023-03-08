import React from 'react';
import Tilt from "react-parallax-tilt";
import logo from "../../assets/face-id.png";

function Logo() {
  return (
    <Tilt scale="1.1">
      <div style={{width: "75px" }}>
        <img src={logo} alt="logo"/>
      </div>
    </Tilt>
  )
}

export default Logo