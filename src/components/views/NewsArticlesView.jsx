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
                {/* <img src={article.articleThumbnail} /> */}
                  <span><i><b>{article.provider}</b></i></span>
                  <a href={article.url}>{article.name}</a> {/* posted {article.datePublished} */}
                  
                  <span>{article.description}</span>
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
