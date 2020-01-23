import React from "react"
import PropTypes from "prop-types"
import "./NewsArticles.css"

const NewsArticlesView = props => {
  return (
    <div className="headlines">
      <p id="down-triangle">▼</p>
      <h2>Latest Headlines</h2>
      <div className="articles-container">
        {props.articles ? (
          props.articles.map(article => {
            var s = article.datePublished
            s = s.substring(0, s.indexOf("T"))
            // console.log("pineapple", article)
            return (
              <div className="article" key={article.name}>
                <span className="headline">
                  <i>
                    <b>{article.provider}</b>
                  </i>
                </span>
                <div className="article-content">
                  {article.articleThumbnail &&
                  article.articleThumbnail.thumbnail ? (
                    <div className="article-thumbnail">
                      <img
                        src={article.articleThumbnail.thumbnail.contentUrl}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="article-info">
                    <a href={article.url} target="blank">
                      {article.name}
                    </a>{" "}
                    <b id="timestamp">posted {s}</b>
                    <p id="article-description">{article.description}</p>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p id="no-articles-found">
            There were no articles found about this official.
          </p>
        )}
      </div>
    </div>
  )
}

NewsArticlesView.propTypes = {
  articles: PropTypes.array.isRequired
}

export default NewsArticlesView
