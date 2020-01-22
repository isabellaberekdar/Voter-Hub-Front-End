import React from "react"
import PropTypes from "prop-types"
// import "./Funding.css"

const FundingView = props => {
  return (
    <div>
      <h2>Funding</h2>
      <div>
        {props.articles
          ? props.articles.map(article => {
              return (
                <div key={article.name}>
                  {/* {console.log()} */}
                  <span>
                    <i>
                      <b>{article.provider}</b>
                    </i>
                  </span>
                  <a href={article.url}>{article.name}</a> {article.description}
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
