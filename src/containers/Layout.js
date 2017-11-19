import React, { Component } from 'react'
import '../assets/scss/layout.scss';

const Layout = ({ children }) => {
  // render() {
    return(
      <div className="page col-xs-12">
            { children }
        </div>
    );
  // }
};

export default Layout;
