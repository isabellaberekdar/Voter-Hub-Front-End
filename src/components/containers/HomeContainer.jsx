import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView";

import { getOfficialThunk } from "../../store/utilities/official";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getOfficial({ city: "New York", state: "NY", zip: "10065" });
  }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  // handleSubmit = event => {
  //   event.preventDefault();

  //   // needs validation
  //   // this doesn't work because inputValue is not currently an address object
  //   // this.props.getOfficial(this.state.inputValue);
  // };

  render() {
    return (
      <div>
        <h1>HomeContainer here</h1>
        <HomeView handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    getOfficial: address => dispatch(getOfficialThunk(address))
  };
};

export default connect(mapState, mapDispatch)(HomeContainer);
