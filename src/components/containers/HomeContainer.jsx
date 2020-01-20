import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView";
import {
  getOfficialsThunk,
  getPhotoThunk
} from "../../store/utilities/official";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.getOfficialsThunk({
      city: "New York",
      state: "NY",
      zip: "10065"
    });
  };

  // handleChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  // handleSubmit = event => {
  //   event.preventDefault();

  //   // needs validation
  //   // this doesn't work because inputValue is not currently an address object
  //   // this.props.getOfficial(this.state.inputValue);
  // };

  render() {
    console.log("apple", this.props.store);
    return (
      <div>
        <h1>HomeContainer here</h1>
        <HomeView handleSubmit={this.handleSubmit} store={this.props.store} />
      </div>
    );
  }
}

const mapState = state => {
  console.log(state);
  return {
    photo: state.official,
    store: state.official.officials
  };
};

const mapDispatch = dispatch => {
  return {
    getPhotoThunk: (first, last, state) =>
      dispatch(getPhotoThunk(first, last, state)),
    getOfficialsThunk: address => dispatch(getOfficialsThunk(address))
  };
};

export default connect(mapState, mapDispatch)(HomeContainer);
