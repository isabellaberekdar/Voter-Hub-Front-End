import React from "react";
import PropTypes from "prop-types";
import FundingCard from "../views/FundingCard";
import '../views/Funding.css';

class FundingContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log("radicchio", this.props)
    let funderCards = this.props.funders.map((funder, index) => (
      <FundingCard funder={funder} index={index+1}/>
    ))
    return (
      <div className="funding-block">
        <p id="funding-anchor" class="down-triangle">▼</p>
        <h2 id="top-10-title">Top 10 Industry Funders for the 2020 Cycle</h2>
        <div className="funding-grid">{funderCards}</div>
      </div>
    )
  }
}

export default FundingContainer
