import React from "react"
import PropTypes from "prop-types"
import "./NewsArticles.css"

const NewsArticlesView = props => {
 
  return (
    <div className='headlines'>
      <h2>Latest Headlines...</h2>
      <div className='articles-container'>
        {props.articles
          ? props.articles.map(article => {
              return (
                <div className='article' key={article.name}>
                  {/* article.articleThumbnail && <img src={article.articleThumbnail.thumbnail.contentUrl} /> */}
                  { console.log()}
                  <span className='headline'>
                    <i>
                      <b>{article.provider}</b>
                    </i>
                  </span>
                  <a href={article.url}>{article.name}</a> {/* posted {article.datePublished} */}
                  {article.description}
                </div>
              )
            })
          : "There were no articles found about this official."}
      </div>
    </div>
  )
}

NewsArticlesView.propTypes = {
  articles: PropTypes.array.isRequired
}

export default NewsArticlesView
