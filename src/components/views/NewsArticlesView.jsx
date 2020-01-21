import React from "react"
import PropTypes from "prop-types"
import "./NewsArticles.css"

const NewsArticlesView = props => {
  return (
    <div className='articles-container'>
      {props.articles
        ? props.articles.map(article => {
            return (
              <div className='article' key={article.name}>
                <img src={article.articleThumbnail} />
                <h3>{article.name}</h3>
                {article.provider}
                {article.datePublished}
                {article.url}
                {article.description}
              </div>
            )
          })
        : "There were no articles found about this official."}
    </div>
  )
}

NewsArticlesView.propTypes = {
  articles: PropTypes.array.isRequired
}

export default NewsArticlesView
