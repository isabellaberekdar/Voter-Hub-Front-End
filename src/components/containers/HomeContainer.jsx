import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView"
import { getOfficialsThunk } from "../../store/utilities/official"

class HomeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      placeholder: "Enter your address to find who represents you...",
      searchbarValue: ""
    }
  }

  componentDidMount() {}

  handleChange = event => {
    this.setState({ searchbarValue: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log("bar", this.state.searchbarValue)
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
    getOfficialsThunk: searchbarValue =>
      dispatch(getOfficialsThunk(searchbarValue))
  }
}

export default connect(mapState, mapDispatch)(HomeContainer)
