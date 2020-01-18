import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import RepresentativeView from "../views/RepresentativeView";

class RepresentativeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        RepresentativeContainer here
        <RepresentativeView />
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

export default connect(mapState, mapDispatch)(RepresentativeContainer);
