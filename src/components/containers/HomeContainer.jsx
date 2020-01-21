import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView"
import {
  getOfficialThunk,
  getOfficialsThunk
} from "../../store/utilities/official"

class HomeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      placeholder: "Enter your address to find who represents you...",
      searchbarValue: ""
    }
  }

  componentDidMount() {
    // this.props.getSingleOfficialThunk(
    //   "ocd-division/country:us/state:ny/county:new_york",
    //   0
    // )
    // this.props.getOfficialsThunk({
    //   city: "Sacramento",
    //   state: "CA",
    //   zip: "95811"
    // })
  }

  handleChange = event => {
    this.setState({ searchbarValue: event.target.value })
  }

  // Addresses for testing:
  // 695 Park Ave, New York, NY 10065
  // 200 W. 24th Cheyenne, WY 82001
  // 1340 Woodstock Rd, San Marino, CA 91108
  // 2332 Margaret W Alexander Dr, Jackson, MS 39213
  handleSubmit = event => {
    event.preventDefault()
    console.log("bar", this.state.searchbarValue)
    // let url = "http://ctp-zip-api.herokuapp.com/zip/" + this.state.value
    this.props.getOfficialsThunk(this.state.searchbarValue)
  }

  focusFunc = () => {
    this.setState({
      placeholder: ""
    })
  }

  unfocusFunc = () => {
    this.setState({
      placeholder: "Enter your address to find who represents you..."
    })
  }

  render() {
    console.log(this.props.store)
    return (
      <div>
        <HomeView
          placeholderText={this.state.placeholder}
          searchbarValue={this.state.searchbarValue}
          focusFunc={this.focusFunc}
          unfocusFunc={this.unfocusFunc}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          store={this.props.store}
        />
      </div>
    )
  }
}

const mapState = state => {
  // console.log(state)
  return {
    photo: state.official,
    store: state.official.officials
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleOfficialThunk: (divisionId, index) =>
      dispatch(getOfficialThunk(divisionId, index)),
    getOfficialsThunk: searchbarValue =>
      dispatch(getOfficialsThunk(searchbarValue))
  }
}

export default connect(mapState, mapDispatch)(HomeContainer)
