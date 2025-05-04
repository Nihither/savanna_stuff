import React from 'react';
import {FaUser} from "react-icons/fa";


function NavHeader() {
  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid px-4">
        <a href="/" className="navbar-brand text-light">Stuff</a>
        <FaUser className="nav-item text-light"/>
      </div>
    </nav>
  )
}

export default NavHeader;