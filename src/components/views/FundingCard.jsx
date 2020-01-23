import React from "react"
// import "./FundingContainer.css"
import "./FundingCard.css"

const FundingCard = props => {
  return (
    <div className="funding-card">
      <div className="index">{props.index}</div>
      <div className="funding-info">
        <p className="funding-industry">
          {props.funder["@attributes"].industry_name.toUpperCase()}
        </p>
        <p>
          <b>Individual Contributions:</b> ${props.funder["@attributes"].indivs}
        </p>
        <p>
          <b>
            <a href="https://www.opensecrets.org/pacs/pacfaq.php">PAC</a>{" "}
            Contributions:
          </b>{" "}
          ${props.funder["@attributes"].pacs}
        </p>
        <p>
          <b>Total Contributions:</b> ${props.funder["@attributes"].total}
        </p>
      </div>
    </div>
  )
}

export default FundingCard
