import React from "react"
import PropTypes from "prop-types"
import "./NewsArticles.css"

const NewsArticlesView = props => {

 
  return (
    <div className='headlines'>
      <p id="down-triangle">▼</p>
      <h2>Latest Headlines...</h2>
      <div className='articles-container'>
        {props.articles
          ? props.articles.map(article => {
            var s = article.datePublished;
            s = s.substring(0, s.indexOf('T'));
              return (
                <div className='article' key={article.name}>
                  {/* article.articleThumbnail && <img src={article.articleThumbnail.thumbnail.contentUrl} /> */}
                  { console.log()}
                  <span className='headline'>
                    <i>
                      <b>{article.provider}</b>
                    </i>
                  </span>
                  <a 
                    href={article.url} target="blank">{article.name}</a> <b>posted {s}</b>
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
