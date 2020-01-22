import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView"
import { getOfficialsThunk } from "../../store/utilities/official"

class HomeContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      placeholder: "Enter Address...",
      searchbarValue: "",
    }
  }

  componentDidMount() {}

  handleChange = event => {
    this.setState({ 
      searchbarValue: event.target.value,
    })
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

  blurFunc = event => {
    console.log("unfocusing");
    this.setState({
      placeholder: "Enter Address..."
    })
    if(event.target.value.trim() === "") {
      this.setState({
        searchbarValue: this.state.placeholder
      })
    }
  }

  handleScriptLoad = () => {
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("address-entry"),
    )
    this.autocomplete.setFields(["address_components", "formatted_address"])
    this.autocomplete.addListener("place_changed", this.handleSelectAddress)
  }

  handleSelectAddress = () => {
    const addressObject = this.autocomplete.getPlace()
    const address = addressObject.address_components

    if (address) {
      // Set State
      this.setState({
        searchbarValue: addressObject.formatted_address
      })
    }
  }

  render() {
    console.log(this.props.store)
    return (
      <div>
        <HomeView
          placeholderText={this.state.placeholder}
          searchbarValue={this.state.searchbarValue}
          focusFunc={this.focusFunc}
          blurFunc={this.blurFunc}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          store={this.props.store}
          handleScriptLoad={this.handleScriptLoad}
          handleSelectAddress={this.handleSelectAddress}
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
