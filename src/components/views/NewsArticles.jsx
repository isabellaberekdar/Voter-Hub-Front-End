import React from "react"
import PropTypes from 'prop-types'
import './NewsArticles.css'

const NewsArticles = props => {  
  return (  
    <div className='articles-container'>
      {props.articles ?
        props.articles.map(article => {
          return (
            <div className='article'>
              <img src={article.image.thumbnail.contentUrl} />
              <h3>{article.name}</h3>
              <p>{article.provider.name}</p>
              <p>{article.datePublished}</p>
              <p>{article.description}</p>
            </div>
          )
        })
      : 
        null
    }
    </div>
  )
}


NewsArticles.propTypes = {
   articles: PropTypes.array.isRequired
 }


export default NewsArticles
