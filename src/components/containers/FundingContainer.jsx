import React from "react"
import PropTypes from "prop-types"
import FundingCard from "../views/FundingCard"

class FundingContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("radicchio", this.props)
    let funderCards = this.props.funders.map(funder => (
      <FundingCard funder={funder} />
    ))
    return (
      <div className="funding-component">
        <h2>Top 10 Industry Funders for the 2020 cycle:</h2>
        <div className="funding-grid">{funderCards}</div>
      </div>
    )
  }
}

export default FundingContainer
