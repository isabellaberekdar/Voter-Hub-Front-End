import React, { Component } from "react"
import { connect } from "react-redux"
import OfficialView from "../views/OfficialView"
import { getOfficialThunk, getPhotoThunk } from "../../store/utilities/official"

class OfficialContainer extends Component {
  componentDidMount() {
    // Fetch the object from the Google api that has information about the government official

    // First, get the necessary values from the url
    // const state = this.props.match.params.state;
    // const index = this.props.match.params.index;
    // console.log(state, index);
    // this.props.getOfficial(state, index);
    // check if there is a photo. If not, go find one

    const division = this.props.match.params.division
    const officeIndex = this.props.match.params.officeIndex
    const officialIndex = this.props.match.params.officialIndex
    // console.log("kumquat", division, officeIndex, officialIndex)

    this.props.getOfficialThunk(division, officeIndex, officialIndex)
  }

  render() {
    return (
      <div>
        <h1>OfficialContainer here</h1>
        {this.props.official && <img src={this.props.official.photoUrl} />}
        <OfficialView officialObject={this.props.official} />
      </div>
    )
  }
}

const mapState = state => {
  // let studentInfo = state.studentReducer.allStudents[ownProps.match.params.id];
  return {
    // studentInfo: studentInfo,
    // campus: state.campusReducer.allCampuses[studentInfo.campus],
    division: "state.google.divisions",
    office: "state.google.offices",
    official: state.official.official

    /*     official: "state.google.officials"

 */
  }
}

const mapDispatch = dispatch => {
  return {
    getOfficialThunk: (division, officeIndex, officialIndex) =>
      dispatch(getOfficialThunk(division, officeIndex, officialIndex)),
    getPhoto: (number, state) => dispatch(getPhotoThunk(number, state))
  }
}

export default connect(mapState, mapDispatch)(OfficialContainer)
