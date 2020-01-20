import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { me } from "../../thunks";
import '../views/Footer.css';

class Footer extends Component {
    render() {
      return (
        <div className="footer">
            <p>
                © 2020 Voter Hub. <br></br>
                Made in the Winter 2020 CUNY 2X/TTP Bootcamp.<br></br>
                Created by Darren Zhang, Eva Yan, Isabella Berekdar, and Samson Wu.<br></br>
            </p>
            <p>Know your rights.</p>
            <p>
                <a href="https://vote.gov/" target="blank">Register to vote.</a>
                <a href="https://www.usa.gov/election-day" target="blank">Voting on Election Day</a> <br></br>
                <a href="https://www.clearias.com/election-process-of-us-president/" target="blank">Presidential election process.</a> 
                <a href="https://www.270towin.com/" target="blank">Presidential election map</a>
            </p>
        </div>
      );
    }
  }

  
  export default Footer;