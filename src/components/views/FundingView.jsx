import React from "react";
import PropTypes from "prop-types";
import "./Funding.css";

const FundingView = props => {
  return (
    <div className="funding-block">
      <p id="down-triangle">▼</p>
      <h2>Funding Records...</h2>
      <div className="funding-info-container">
        {props.articles
          ? props.articles.map(article => {
              return (
                <div classname="funding" key={article.name}>
                  <span>
                    <i>
                      <b>{article.provider}</b>
                    </i>
                  </span>
                  <a href={article.url}>{article.name}</a> {article.description}
                </div>
              )
            })
          : <p id="no-funding-message">There was no funding information found about this official.</p>}
      </div>
    </div>
  )
}

// FundingView.propTypes = {
// }

export default FundingView
