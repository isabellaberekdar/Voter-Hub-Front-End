import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>HomeContainer here</h1>
        <HomeView />
      </div>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(HomeContainer);
