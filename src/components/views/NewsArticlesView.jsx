import React from "react"
import PropTypes from "prop-types"
import "./NewsArticles.css"

const NewsArticlesView = props => {
  return (
    <div className='headlines'>
      <p id='headlines-anchor' class='down-triangle'>
        ▼
      </p>
      <h2>Latest Headlines</h2>
      <div className='articles-container'>
        {props.articles ? (
          props.articles.map(article => {
            let date = article.publishedAt
            date = date.substring(0, date.indexOf(" "))
            return (
              <div className='article' key={article.title}>
                <span className='headline'>
                  <i>
                    <b>{article.source.name}</b>
                  </i>
                </span>
                <div className='article-content'>
                  {article.image && (
                    <div className='article-thumbnail'>
                      <img src={article.image} />
                    </div>
                  )}
                  <div className='article-info'>
                    <a href={article.url} target='blank'>
                      {article.title}
                    </a>{" "}
                    <b id='timestamp'>posted {date}</b>
                    <p id='article-description'>{article.description}</p>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p id='no-articles-found'>There were no articles found about this official.</p>
        )}
      </div>
    </div>
  )
}

NewsArticlesView.propTypes = {
  articles: PropTypes.array.isRequired
}

export default NewsArticlesView
