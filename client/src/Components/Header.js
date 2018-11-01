import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav><NavLink className="signup" to={"/SignUp"}>Sign Up</NavLink><NavLink className="signin" to={"/SignIn"}>Sign In</NavLink></nav>
        </div>
      </div>
    );
}

export default Header;