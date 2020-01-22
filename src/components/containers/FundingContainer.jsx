import React from "react"
import PropTypes from "prop-types"
import FundingView from "../views/FundingView"
import { getCidThunk, getFundersThunk } from "../../store/utilities/official"
import { connect } from "react-redux"

class FundingContainer extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {:}
  }

  componentDidMount() {
    // this.props.getArticles(this.props.official)
    this.props.getCid(this.props.nameObj).then(() => {
      this.props.getFunders(this.props.cid.cid)
    })
  }

  render() {
    // console.log("radicchio", this.props)

    return <FundingView cid={this.props.cid} funders={this.props.funders} />
  }
}

FundingContainer.propTypes = {
  // articles: PropTypes.array.isRequired
}

const mapState = state => {
  return {
    // articles: state.official.articles
    nameObj: state.official.nameObj,
    cid: state.official.cid,
    funders: state.official.funders
  }
}

const mapDispatch = dispatch => {
  return {
    getCid: nameObj => dispatch(getCidThunk(nameObj)),
    getFunders: cid => dispatch(getFundersThunk(cid))
  }
}

export default connect(mapState, mapDispatch)(FundingContainer)
