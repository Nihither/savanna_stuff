import React from 'react';
import {FaBaby, FaBell, FaBook, FaPlus, FaTasks} from "react-icons/fa";


function NavMenu() {
  return (
    <div className="container-fluid fixed-bottom bg-light border-top border-dark-subtle py-2">
      <ul className="nav justify-content-around ">
        <li className="nav-item">
          <a className="nav-link" href="/reminders">
            <FaBell size="20" className="text-secondary"/>
          </a>
        </li>
        <div className="vr"></div>
        <li className="nav-item">
          <a className="nav-link" href="/reports">
            <FaTasks size="20" className="text-secondary"/>
          </a>
        </li>
        <div className="vr"></div>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <FaPlus size="20" className=""/>
          </a>
        </li>
        <div className="vr"></div>
        <li className="nav-item">
          <a className="nav-link" href="/students">
            <FaBaby size="20" className="text-secondary"/>
          </a>
        </li>
        <div className="vr"></div>
        <li className="nav-item">
          <a className="nav-link" href="/teachers">
            <FaBook size="20" className="text-secondary"/>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default NavMenu;