import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { logout } from "../../thunks";
import { connect } from "react-redux"
import { me } from "../../thunks"
import "../views/Navbar.css"

class NavbarContainer extends Component {

    render() {
      console.log(this.props)
      let logInOrOut, logInLink, logOutLink, displayUser;
      if(!this.props.isLoggedIn){
        logInLink = <Link to="/login">Login</Link>
        logOutLink = <Link to="/signup" >Signup</Link>
      }
      else{
        logInOrOut = <Link to="/" onClick={this.props.logout}>Logout</Link>
        displayUser = this.props.isLoggedIn ? <p id="current-user-message">({this.props.userEmail})</p> 
      : <p>{""}</p>
      } 

      return (
        <div>
        <div className="navbar">
            <div className="left-navbar-content">
                <img src='/images/siteicon.png' width="28px" height="28px"></img>
                <div>
                    <Link to="/">
                        <h1>Voter Hub</h1>
                    </Link>
                </div>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>  
                <Link>Your Stream</Link>  
                {logInLink}
                {logOutLink}
                {logInOrOut} 
                {displayUser}
            </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userEmail: state.user.email
  }
}

// Map dispatch to props;
const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
};

export default withRouter(connect(mapState, mapDispatch)(NavbarContainer));
// export const Logout = connect(null, mapDispatch)(NavbarContainer);
