import React from "react"
// import "./FundingContainer.css"
import "./FundingCard.css"

const FundingCard = props => {
  console.log(props.funder["@attributes"])

  {
    console.log(props.funder["@attributes"].industry_name)
  }
  {
    console.log(props.funder["@attributes"].industry_code)
  }
  {
    console.log(props.funder["@attributes"].indivs)
  }
  {
    console.log(props.funder["@attributes"].pacs)
  }
  {
    console.log(props.funder["@attributes"].total)
  }
  return (
    <div className="funding-card">
      <div className="octothorpe">#</div>
      <div className="funding-info">
        <p className="funding-industry">
          {props.funder["@attributes"].industry_name.toUpperCase()}
        </p>
        <p>
          <b>Individual Contributions:</b> ${props.funder["@attributes"].indivs}
        </p>
        <p>
          <b>PAC Contributions:</b> ${props.funder["@attributes"].pacs}
        </p>
        <p>
          <b>Total Contributions:</b> ${props.funder["@attributes"].total}
        </p>
      </div>
    </div>
  )
}

export default FundingCard
