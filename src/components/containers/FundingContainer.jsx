import React from "react"
import PropTypes from "prop-types"
import FundingView from "../views/FundingView"
import { getCidThunk } from "../../store/utilities/official"
import { connect } from "react-redux"

class FundingContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("radicchio", this.props)
    return <FundingView funders={this.props.funders} />
  }
}

export default FundingContainer
