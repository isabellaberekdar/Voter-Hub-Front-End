import React from "react"
import PropTypes from "prop-types"
import FundingView from "../views/FundingView"
import { getCidThunk, getFundersThunk } from "../../store/utilities/official"
import { connect } from "react-redux"

class FundingContainer extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {:}
  }

  render() {
    // console.log("radicchio", this.props)

    return <FundingView cid={this.props.cid} funders={this.props.funders} />
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
  return {}
}

export default connect(mapState, mapDispatch)(FundingContainer)
