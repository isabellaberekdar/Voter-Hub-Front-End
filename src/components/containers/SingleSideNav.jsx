import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../views/SingleSideNav.css';
import AnchorLink from 'react-anchor-link-smooth-scroll'

class SingleSideNav extends Component {
    render() {
      return (
        <div className="nav">
            <h2>Navigate</h2>
            <AnchorLink href="#headlines-anchor">Headlines</AnchorLink>  <p id="headline-circle">〇</p> <br></br>
            <AnchorLink href="#funding-anchor">Funding</AnchorLink>  <p id="funding-circle"> 〇</p> <br></br>
            <AnchorLink href="messageboard-anchor">Messageboard</AnchorLink>  <p id="messageboard-circle">〇</p>
        </div>
      );
    }
  }

  
  export default SingleSideNav;