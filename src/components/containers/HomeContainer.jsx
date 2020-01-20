import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView"
import { getSingleOfficialThunk } from "../../store/utilities/official"

class HomeContainer extends Component {
/*   constructor(props) {
    super(props)
  }
 */
  componentDidMount() {
    this.props.getSingleOfficialThunk('ocd-division/country:us/state:ny/county:new_york', 0)
  }

  render() {
    return (
      <div>
        <h1>HomeContainer here</h1>
        <HomeView />
      </div>
    )
  }
}

const mapState = state => {
  return {
    photo: state.official
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleOfficialThunk: (divisionId, index) => dispatch(getSingleOfficialThunk(divisionId, index))
  }
}

export default connect(mapState, mapDispatch)(HomeContainer)
