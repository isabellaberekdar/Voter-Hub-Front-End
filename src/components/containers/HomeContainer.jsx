import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView";
import { getPhotoThunk, getOfficialThunk } from '../../store/utilities/official'

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {
    
    this.props.getPhotoThunk('Charles', 'Schumer', 'NY')    
    console.log(this.props.photo)
  }

  render() {
    return (
      <div>
        <h1>HomeContainer here</h1>
        <HomeView />
      </div>
    );
  }
}

const mapState = state => {
  return {
    photo: state.official
  };
};

const mapDispatch = dispatch => {
  return {
    getPhotoThunk: (first, last, state) => dispatch(getPhotoThunk(first, last, state)),
    getOfficialThunk: address => dispatch(getOfficialThunk(address))
  };
};

export default connect(mapState, mapDispatch)(HomeContainer);
