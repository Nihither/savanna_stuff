import React from 'react';
import {Outlet} from "react-router-dom";
import NavMenu from "../elements/navMenu.jsx";
import NavHeader from "../elements/navHeader.jsx";


class Root extends React.Component {

  render() {
    return (
      <>
        <NavHeader />
        <h3>Root page content</h3>
        <Outlet />
        <NavMenu />
      </>
    )
  }
}

export default Root;