import React from "react"
import PropTypes from "prop-types"
import NewsArticlesView from "./NewsArticlesView"
import { getArticlesThunk } from "../../store/utilities/official"
import { connect } from "react-redux"
class NewsArticlesContainer extends React.Component {
  componentDidMount() {
    this.props.getArticles(this.props.official)
  }

  render() {
    return <NewsArticlesView articles={this.props.articles} />
  }
}

NewsArticlesContainer.propTypes = {
  articles: PropTypes.array.isRequired
}

const mapState = state => {
  return {
    articles: state.official.articles
  }
}

const mapDispatch = dispatch => {
  return {
    getArticles: name => dispatch(getArticlesThunk(name))
  }
}

export default connect(mapState, mapDispatch)(NewsArticlesContainer)
