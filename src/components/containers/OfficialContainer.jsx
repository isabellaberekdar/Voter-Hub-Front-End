import React, { Component } from "react"
import { connect } from "react-redux"
import OfficialView from "../views/OfficialView"
import { getOfficialThunk } from "../../store/utilities/official"

class OfficialContainer extends Component {
  componentDidMount() {
    // Fetch the object from the Google api that has information about the government official

    // First, get the necessary values from the url
    const state = this.props.match.params.state
    const index = this.props.match.params.index
    console.log(state, index)
    this.props.getOfficial(state, index)
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <h1>OfficialContainer here</h1>
        <OfficialView division='division here' office='office here' official='official here' />
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
    official: "state.google.officials"
  }
}

const mapDispatch = dispatch => {
  return {
    getOfficial: (state, index) => dispatch(getOfficialThunk(state, index))
  }
}

export default connect(mapState, mapDispatch)(OfficialContainer)
