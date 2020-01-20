import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Official"; // Get the action creator for ____?
import OfficialView from "../views/OfficialView";
import {getOfficialThunk} from '../../store/utilities/official' 


class OfficialContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>OfficialContainer here</h1>
        <OfficialView
          division="division here"
          office="office here"
          official="official here"
        />
      </div>
    );
  }
}

const mapState = state => {
  // let studentInfo = state.studentReducer.allStudents[ownProps.match.params.id];
  return {
    // studentInfo: studentInfo,
    // campus: state.campusReducer.allCampuses[studentInfo.campus],
    division: "state.google.divisions",
    office: "state.google.offices",
    official: "state.google.officials"
  };
};

const mapDispatch = dispatch => {
  return {
    getOfficial: (divisionId, index) => dispatch(getOfficialThunk(divisionId, index))

  };
};

export default connect(mapState, mapDispatch)(OfficialContainer);
