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
    super(props);

    this.state = ({
      placeholder: "Enter your address to find who represents you..."
    })
    
  }

  componentDidMount() {
    this.props.getSingleOfficialThunk(
      "ocd-division/country:us/state:ny/county:new_york",
      0
    )
    this.props.getOfficialsThunk({
      city: "Sacramento",
      state: "CA",
      zip: "95811"
    })
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
    return (
      <div>
        <HomeView 
          placeholderText={this.state.placeholder} 
          focusFunc={this.focusFunc} 
          unfocusFunc={this.unfocusFunc}
          handleSubmit={this.handleSubmit} 
          store={this.props.store} />
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return {
    photo: state.official,
    store: state.official.officials
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleOfficialThunk: (divisionId, index) =>
      dispatch(getOfficialThunk(divisionId, index)),
    getOfficialsThunk: address => dispatch(getOfficialsThunk(address))
  }
}

export default connect(mapState, mapDispatch)(HomeContainer)
