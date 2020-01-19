import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView";

import { getOfficialsThunk } from "../../store/utilities/officials";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { divisions: {}, offices: [], officials: [] };
  }

  componentDidMount = () => {
    this.props
      .getOfficial({ city: "New York", state: "NY", zip: "10065" })
      .then(
        this.setState({
          // data: this.props.store
          // offices: this.props.store.offices,
          // officials: this.props.store.officials
        })
      )
      .then("orange", console.log(this.state));
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
    // if (this.props.store.hasOwnProperty("divisions")) {
    //   console.log(this.props.store.divisions);
    // }

    return (
      <div>
        <h1>HomeContainer here</h1>
        <HomeView
          handleSubmit={this.handleSubmit}
          divisions={this.props.divisions}
          offices={this.props.offices}
          officials={this.props.officials}
        />
      </div>
    );
  }
}

const mapState = state => {
  return { store: state.officialsReducer.officials };
};

const mapDispatch = dispatch => {
  return {
    getOfficial: address => dispatch(getOfficialsThunk(address))
  };
};

export default connect(mapState, mapDispatch)(HomeContainer);
