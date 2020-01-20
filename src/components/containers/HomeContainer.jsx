import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView"
import { getOfficialThunk } from "../../store/utilities/official"

class HomeContainer extends Component {
/*   constructor(props) {
    super(props)
  }
 */
  componentDidMount() {
    this.props.getSingleOfficialThunk('ocd-division/country:us/state:ny/county:new_york', 0)
  }

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
    getSingleOfficialThunk: (divisionId, index) => dispatch(getOfficialThunk(divisionId, index))
  }
}

export default connect(mapState, mapDispatch)(HomeContainer);
