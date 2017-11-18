import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import '../assets/scss/layout.scss';

const Layout = ({ children }) => {
  // render() {
    return(
      <div className="page col-xs-12">

            <Header />
            { children }
            <Footer />
        </div>
    );
  // }
};

export default Layout;
