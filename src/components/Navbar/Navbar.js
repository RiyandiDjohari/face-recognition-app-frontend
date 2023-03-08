import React from 'react';
import Logo from '../Logo/Logo';
import "./Navbar.css";

function Navbar({onRouteChange, isSignedIn}) {
  return (
    isSignedIn ? 
    <nav>
      <div className='left'>
        <Logo />
        <h2>SmartBrain App</h2>
      </div>
      <ul className='right'>
        <li 
          className='f3 dim black pa3 pointer link'
          onClick={() => onRouteChange("signin")}
        >Sign Out</li>
      </ul>
    </nav> : 
    <nav>
      <div className='left'>
        <Logo />
        <h2>SmartBrain App</h2>
      </div>
    </nav>
  )
}

export default Navbar