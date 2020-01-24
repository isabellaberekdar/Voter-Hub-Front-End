import React, { Component } from "react"
import { connect } from "react-redux"
import OfficialView from "../views/OfficialView"
import MessageBoard from "../views/MessageBoard"
import {
  getOfficialThunk,
  getPhotoThunk,
  getArticlesThunk,
  getCidThunk,
  getFundersThunk,
  storeName,
  storeState,
  storeCD,
  storeZip,
  storeCoordsThunk
} from "../../store/utilities/official"
import Map from "./Map"

class OfficialContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateAbbrev: "",
      officialId: "",
      funding: false
    }
  }

  componentDidMount() {
    // Fetch the object from the Google api that has information about the government official

    // First, get the necessary values from the url
    const state = this.props.match.params.state
    const index = this.props.match.params.index
    // check if there is a photo. If not, go find one
    /*     this.props.getArticles(this.props.official.name)
     */
    const division = this.props.match.params.division
    const officeIndex = this.props.match.params.officeIndex
    const officialIndex = this.props.match.params.officialIndex
    // console.log("kumquat", division, officeIndex, officialIndex)

    const officialId =
      division.replace(/\//gi, "%2F").replace(/:/gi, "%3A") +
      "%2F" +
      officeIndex +
      "%2F" +
      officialIndex

    this.setState({ officialId: officialId })

    this.props
      .getOfficial(division, officeIndex, officialIndex)
      .then(() => {
        if (
          this.props.official.office.name.includes("U.S. Senator") ||
          this.props.official.office.name.includes("U.S. Representative")
        ) {
          this.setState({ funding: true })
        }
      })
      .then(() => {
        // console.log("pepper", this.props)
        let nameObj = {}
        let stateAbbrev = this.props.official.office.divisionId.substring(
          this.props.official.office.divisionId.lastIndexOf("state:") + 6
        )
        if (stateAbbrev.includes("/")) {
          stateAbbrev = stateAbbrev.substring(0, stateAbbrev.indexOf("/"))
        }
        let firstName = this.props.official.official.name.substring(
          0,
          this.props.official.official.name.indexOf(" ")
        )
        firstName = firstName.replace(".", "")
        let lastName = this.props.official.official.name.substring(
          this.props.official.official.name.lastIndexOf(" ") + 1
        )
        let phone = this.props.official.official.phones[0]
          .replace("(", "")
          .replace(")", "")
          .replace("-", "")
          .replace(" ", "")
        // console.log({
        //   stateAbbrev: stateAbbrev,
        //   firstName: firstName,
        //   lastName: lastName,
        //   phone: phone
        // })

        this.props.storeName({
          stateAbbrev: stateAbbrev,
          firstName: firstName,
          lastName: lastName,
          phone: phone
        })
      })
      .then(() =>
        this.props.getCid(this.props.nameObj).then(() => {
          if (this.props.cid) {
            this.props.getFunders(this.props.cid.cid)
          }
        })
      )
      .then(() => {
        console.log("plantain", this.props.official.office.divisionId)
      })
      .then(() => {
        let stateAbbrev
        let cd
        let zip
        if (this.props.official.office.divisionId.includes("state:")) {
          stateAbbrev = this.props.official.office.divisionId.substring(
            this.props.official.office.divisionId.lastIndexOf("state:") + 6
          )
          if (stateAbbrev.includes("/")) {
            stateAbbrev = stateAbbrev.substring(0, stateAbbrev.indexOf("/"))
          }
          stateAbbrev = stateAbbrev.toUpperCase()
          console.log(stateAbbrev)
          this.props.storeState(stateAbbrev)
        } else {
          this.props.storeState(undefined)
        }

        if (this.props.official.office.divisionId.includes("cd:")) {
          cd = this.props.official.office.divisionId.substring(
            this.props.official.office.divisionId.lastIndexOf("cd:") + 3
          )
          if (stateAbbrev.includes("/")) {
            stateAbbrev = stateAbbrev.substring(0, stateAbbrev.indexOf("/"))
          }
          console.log(cd)
          this.props.storeCD(cd)
        } else {
          this.props.storeCD(undefined)
        }

        if (
          this.props.official.office.divisionId.includes("place:") ||
          this.props.official.office.divisionId.includes("county:")
        ) {
          zip = this.props.official.official.address[0].zip
          console.log("yuzu", zip)
          this.props.storeZip(zip)
        } else {
          this.props.storeZip(undefined)
        }

        console.log("passionfruit", this.props.official.official.address[0].zip)

        this.props.storeCoords(stateAbbrev, cd, zip)
      })
  }

  render() {
    // console.log("beet", this.props)

    return (
      <div>
        {this.props.official && <img src={this.props.official.photoUrl} />}
        <OfficialView
          officialObject={this.props.official}
          funders={this.props.funders}
          officialId={this.state.officialId}
          coords={this.props.coords}
          funding={this.state.funding}
        />
        <MessageBoard />
      </div>
    )
  }
}

const mapState = state => {
  // console.log("turnip", state.official.official)
  // you can't access/destructure anything deeper here than state.official.official because there are times at the beginning of loading when it is still undefined
  // however, you can map it to the props of this component, and access the innards later once they come into existence
  return {
    division: "",
    office: "",
    official: state.official.official,
    articles: state.official.articles,
    nameObj: state.official.nameObj,
    cid: state.official.cid,
    funders: state.official.funders,
    coords: state.official.coords
  }
}

const mapDispatch = dispatch => {
  return {
    getOfficial: (division, officeIndex, officialIndex) =>
      dispatch(getOfficialThunk(division, officeIndex, officialIndex)),
    getPhoto: (number, state) => dispatch(getPhotoThunk(number, state)),
    getArticles: name => dispatch(getArticlesThunk(name)),
    getCid: nameObj => dispatch(getCidThunk(nameObj)),
    storeName: nameObj => dispatch(storeName(nameObj)),
    getFunders: cid => dispatch(getFundersThunk(cid)),
    storeState: stateAbbrev => dispatch(storeState(stateAbbrev)),
    storeCD: CD => dispatch(storeCD(CD)),
    storeZip: zip => dispatch(storeZip(zip)),
    storeCoords: (state, cd, zip) => dispatch(storeCoordsThunk(state, cd, zip))
  }
}

export default connect(mapState, mapDispatch)(OfficialContainer)
