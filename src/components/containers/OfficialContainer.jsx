import React, { Component } from "react";
import { connect } from "react-redux";
import OfficialView from "../views/OfficialView";
import {getOfficialThunk} from '../../store/utilities/official' 


class OfficialContainer extends Component {
  componentDidMount() {
    // Fetch the object from the Google api that has information about the government official

    // First, get the necessary values from the url
    const [state, placeOrCounty, placeOrCountyName, index] = this.props.match.params[0].split('/')
    console.log(state, placeOrCounty, placeOrCountyName, index)
    this.props.getOfficial(state, placeOrCounty, placeOrCountyName, index)
    console.log(this.props)
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
    getOfficial: (state, placeOrCounty, placeOrCountyName, index) => dispatch(getOfficialThunk(state, placeOrCounty, placeOrCountyName, index))

  };
};

export default connect(mapState, mapDispatch)(OfficialContainer);
