import React from "react"
import PropTypes from "prop-types"
import FundingView from "../views/FundingView"
import { getCidThunk } from "../../store/utilities/official"
import { connect } from "react-redux"

class FundingContainer extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {:}
  }

  componentDidMount() {
    // this.props.getArticles(this.props.official)
    this.props.getCid(
      this.props.stateAbbrev,
      this.props.firstName,
      this.props.lastName,
      this.props.phone
    )
  }

  render() {
    console.log("radicchio", this.props)
    return (
      <FundingView
        stateAbbrev={this.props.stateAbbrev}
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        phone={this.props.phone}
      />
    )
  }
}

FundingContainer.propTypes = {
  // articles: PropTypes.array.isRequired
}

const mapState = state => {
  return {
    // articles: state.official.articles
  }
}

const mapDispatch = dispatch => {
  return {
    getCid: (stateAbbrev, firstName, lastName, phone) =>
      dispatch(getCidThunk(stateAbbrev, firstName, lastName, phone))
  }
}

export default connect(mapState, mapDispatch)(FundingContainer)
