import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView";

import { getOfficialsThunk } from "../../store/utilities/officials";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { officials: [] };
  }

  componentDidMount = () => {
    this.props
      .getOfficial({ city: "New York", state: "NY", zip: "10065" })
      .then(this.setState({ officials: this.state.store.officials }))
      .then(console.log("woof"));
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
    console.log(this.props.divisions);
    let homeViewElement = [];
    if (this.props) {
      homeViewElement = (
        <HomeView
          handleSubmit={this.handleSubmit}
          divisions={this.props.divisions}
          offices={this.props.offices}
          officials={this.props.officials}
        />
      );
    } else {
      homeViewElement = [];
    }
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
  // console.log("blah");
  return { store: state.officialsReducer.data };
};

const mapDispatch = dispatch => {
  return {
    getOfficial: address => dispatch(getOfficialsThunk(address))
  };
};

export default connect(mapState, mapDispatch)(HomeContainer);
