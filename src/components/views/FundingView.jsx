import React from "react"
import PropTypes from "prop-types"
// import "./Funding.css"

const FundingView = props => {
  console.log("watercress", props)
  return (
    <div>
      <h2>Funding for the 2020 cycle:</h2>
      <div>
        {props.funders
          ? props.funders.map(funder => {
              return (
                <div key={funder["@attributes"].industry_name}>
                  {/* {console.log(funder["@attributes"].industry_name)}
                  {console.log(funder["@attributes"].industry_code)}
                  {console.log(funder["@attributes"].indivs)}
                  {console.log(funder["@attributes"].pacs)}
                  {console.log(funder["@attributes"].total)} */}
                  <span>
                    <i>
                      <b>{funder["@attributes"].industry_name}</b>
                    </i>
                  </span>
                  <p>
                    <b>Individual contributions:</b> $
                    {funder["@attributes"].indivs}
                  </p>
                  <p>
                    <b>
                      <a href="https://www.opensecrets.org/pacs/pacfaq.php">
                        PAC
                      </a>{" "}
                      contributions:
                    </b>{" "}
                    ${funder["@attributes"].pacs}
                  </p>
                  <p>
                    <b>Total:</b> ${funder["@attributes"].total}
                  </p>
                  {/* <a href={article.url}>{article.name}</a> {article.description} */}
                </div>
              )
            })
          : "There was no funding information found about this official."}
      </div>
    </div>
  )
}

// FundingView.propTypes = {
// }

export default FundingView
