import React, { Component } from "react"
import { connect } from "react-redux"
import OfficialView from "../views/OfficialView"
import { getOfficialThunk, getPhotoThunk, getArticlesThunk } from "../../store/utilities/official"
import NewsArticles from '../views/NewsArticles'
class OfficialContainer extends Component {
  componentDidMount() {
    // Fetch the object from the Google api that has information about the government official

    // First, get the necessary values from the url
    const state = this.props.match.params.state
    const index = this.props.match.params.index
    console.log(state, index)
    this.props.getOfficial(state, index)
    // check if there is a photo. If not, go find one
    this.props.getArticles('Andrew Cuomo')

    console.log("ARTICLES")
  }
  
  render() {
    console.log(this.props.articles)
    return (
      <div>
        <h1>OfficialContainer here</h1>
        {this.props.official && <img src={this.props.official.photoUrl} />}
        <NewsArticles articles={this.props.articles} />
 */}        <OfficialView division='division here' office='office here' official='official here' />
      </div>
    )
  }
}

const mapState = state => {
  // let studentInfo = state.studentReducer.allStudents[ownProps.match.params.id];
  return {
    // studentInfo: studentInfo,
    // campus: state.campusReducer.allCampuses[studentInfo.campus],
    division: "state.google.divisions",
    office: "state.google.offices",
    official: state.official.official,
    articles: state.official.articles
    /*     official: "state.google.officials"

 */
  }
}

const mapDispatch = dispatch => {
  return {
    getOfficial: (state, index) => dispatch(getOfficialThunk(state, index)),
    getPhoto: (number, state) => dispatch(getPhotoThunk(number, state)),
    getArticles: name => dispatch(getArticlesThunk(name))
  }
}

export default connect(mapState, mapDispatch)(OfficialContainer)
