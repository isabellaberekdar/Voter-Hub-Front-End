import React, { Component } from "react"
import { connect } from "react-redux"
import OfficialView from "../views/OfficialView"
import {
  getOfficialThunk,
  getPhotoThunk,
  getArticlesThunk,
  getCidThunk
} from "../../store/utilities/official"

class OfficialContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateAbbrev: ""
    }
  }

  componentDidMount() {
    // Fetch the object from the Google api that has information about the government official
    // First, get the necessary values from the url
    const state = this.props.match.params.state
    const index = this.props.match.params.index
    // check if there is a photo. If not, go find one
    /*     this.props.getArticles(this.props.official.name)
     */
    const division = this.props.match.params.division
    const officeIndex = this.props.match.params.officeIndex
    const officialIndex = this.props.match.params.officialIndex
    // console.log("kumquat", division, officeIndex, officialIndex)

    this.props.getOfficial(division, officeIndex, officialIndex)
  }

  render() {
    return (
      <div>
        {/* <h1>OfficialContainer here</h1> */}
        {this.props.official && <img src={this.props.official.photoUrl} />}
        <OfficialView officialObject={this.props.official} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    division: "state.google.divisions",
    office: "state.google.offices",
    official: state.official.official,
    articles: state.official.articles
  }
}

const mapDispatch = dispatch => {
  return {
    getOfficial: (division, officeIndex, officialIndex) =>
      dispatch(getOfficialThunk(division, officeIndex, officialIndex)),
    getPhoto: (number, state) => dispatch(getPhotoThunk(number, state)),
    getArticles: name => dispatch(getArticlesThunk(name)),
    getCid: (stateAbbrev, fullName) =>
      dispatch(getCidThunk(stateAbbrev, fullName))
  }
}

export default connect(mapState, mapDispatch)(OfficialContainer)
