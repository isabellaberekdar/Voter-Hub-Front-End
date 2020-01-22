import React from "react"
import PropTypes from "prop-types"
import FundingView from "../views/FundingView"
import { getCidThunk } from "../../store/utilities/official"
import { connect } from "react-redux"

class FundingContainer extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {:}
  }

  componentDidMount() {
    // this.props.getArticles(this.props.official)
    this.props.getCid(this.props.nameObj)
  }

  render() {
    console.log("radicchio", this.props)
    return <FundingView cid={this.props.cid} />
  }
}

FundingContainer.propTypes = {
  // articles: PropTypes.array.isRequired
}

const mapState = state => {
  return {
    // articles: state.official.articles
    nameObj: state.official.nameObj,
    cid: state.official.cid
  }
}

const mapDispatch = dispatch => {
  return {
    getCid: nameObj => dispatch(getCidThunk(nameObj))
  }
}

export default connect(mapState, mapDispatch)(FundingContainer)
