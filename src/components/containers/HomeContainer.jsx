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
        HomeContainer here
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
