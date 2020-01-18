import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Official"; // Get the action creator for ____?
import OfficialView from "../views/OfficialView";

class OfficialContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>OfficialContainer here</h1>
        <OfficialView />
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

export default connect(mapState, mapDispatch)(OfficialContainer);
