import React from "react"
import Disqus from "disqus-react"
import NewsArticlesContainer from "../views/NewsArticlesContainer"
import FundingContainer from "../containers/FundingContainer"
import MessageBoardContainer from "../containers/MessageBoard"

// If you need cards or styling, you can uncomment the lines here to import
// import { OfficialCard } from "..";
import "./OfficialView.css"

const OfficialView = props => {
  console.log("parsnip", props)
  let output = []
  let divisionId = ""
  let office = {}
  let official = {}
  if (props.officialObject) {
    divisionId = props.officialObject.office.divisionId
    office = props.officialObject.office
    official = props.officialObject.official
  }

  // Disqus configuration information
  const disqusShortname = "voterbundle" //found in your Disqus.com dashboard
  const disqusConfig = {
    url: window.location.href, //this.props.pageUrl
    identifier: official.name, //this.props.uniqueId
    title: official.name //this.props.title
  }
  // console.log(official)
  // console.log(window.location.href)

  let firstName = ""
  let lastName = ""
  if (official.name) {
    firstName = official.name.substring(0, official.name.lastIndexOf(" "))
    lastName = official.name.substring(official.name.lastIndexOf(" ") + 1)
  }

  // Officials can have anywhere from 0 to 3 channels! We will need to first see if they have any channels at all. If they do, we will then need to iterate through them to generate the elements. Ideally, we should be able to identify the domain of the channel, so that we can link to it directly. eg. https://www.facebook.com/newyorkstateag/ when the type is "Facebook"
  let channels = []
  if (official.channels) {
    for (let key in official.channels) {
      if (official.channels.hasOwnProperty(key)) {
        if (official.channels[key].type == "Facebook") {
          channels.push(
            <a
              href={"https://www.facebook.com/" + official.channels[key].id}
              target="blank"
              id="icon"
            >
              <img
                src="/images/facebook-card.svg"
                alt="homepage-icon"
                className="social-icon"
                width="19px"
                height="19px"
              />
            </a>
          )
        } else if (official.channels[key].type == "Twitter") {
          channels.push(
            <a
              href={"https://www.twitter.com/" + official.channels[key].id}
              target="blank"
              id="icon"
            >
              <img
                src="/images/twitter-card.svg"
                alt="homepage-icon"
                className="social-icon"
                width="19px"
                height="19px"
              />
            </a>
          )
        } else if (official.channels[key].type == "YouTube") {
          channels.push(
            <a
              href={"https://www.youtube.com/" + official.channels[key].id}
              target="blank"
              id="icon"
            >
              <img
                src="/images/youtube-card.svg"
                alt="homepage-icon"
                className="social-icon"
                width="19px"
                height="19px"
              />
            </a>
          )
        }
      }
    }
  }

  // Some officials don't have an address.
  // The address is an array holding a single object of address lines. Kind of weird.
  // Some addresses have a line2 and line3 etc in addition to just a line1 (Andrew M. Cuomo). So we'll have to iterate through them somehow, ignoring any that are just blank strings "".
  let addressLines = []
  if (official.address) {
    if (official.address.hasOwnProperty(0)) {
      let lines = []
      let line2 = ""
      for (let key in official.address[0]) {
        if (["line1", "line2", "line3", "line4"].includes(key)) {
          // console.log(official.address[0][key])
          lines.push(<p>{official.address[0][key]}</p>)
        } else if (key === "city") {
          // console.log(official.address[0][key])
          line2 = line2 + official.address[0][key]
        } else if (key === "state") {
          // console.log(official.address[0][key])
          line2 = line2 + ", " + official.address[0][key]
        } else if (key === "zip") {
          // console.log(official.address[0][key])
          line2 = line2 + " " + official.address[0][key]
        }
      }
      addressLines.push(lines)
      addressLines.push(<p>{line2}</p>)
    }
  }

  return (
    <div className="triptych-container">
      <div className="triptych">
        <div className="portrait">
          {official.photoUrl ? (
            <center>
              <img
                src={official.photoUrl}
                onError={e => {
                  e.target.onerror = null
                  e.target.src = "/images/placeholder.png"
                }}
              />
            </center>
          ) : (
            <center>
              <img src="/images/placeholder.png" target="blank"></img>
            </center>
          )}
        </div>

        <div className="info">
          <p className="first-name">
            <b>{firstName}</b>
          </p>
          <p className="last-name">
            <b>{lastName.toUpperCase()}</b>
          </p>
          <p>
            <b>District: </b>
            {divisionId}
          </p>
          <p>
            <b>Title: </b>
            {office.name}
          </p>
          <p>
            <b>Party: </b>
            {official.party}
          </p>
          {official.phones ? (
            <p>
              <b>Phone: </b>
              {official.phones[0]}
            </p>
          ) : (
            <div></div>
          )}
          {official.emails ? (
            <p>
              <b>Email: </b>
              <a href={"mailto:" + official.emails[0]} target="blank">
                {official.emails[0]}
              </a>
            </p>
          ) : (
            <div></div>
          )}
          {official.urls ? (
            <p>
              <b>Website: </b>
              <a href={official.urls[0]} target="blank">
                {official.urls[0]}{" "}
              </a>
            </p>
          ) : (
            <div></div>
          )}
          {/* {official.address ? <div>{addressLines}</div> : <div></div>} */}

          {official.channels ? (
            <div className="social-media-div">
              <p>
                <b>Social Media: </b>
              </p>
              <div className="social-media-bar">{channels}</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="map"></div>
      </div>

      <div className="twitter"></div>

      <div className="bing-news"></div>

      <p>{output}</p>
      {props.officialObject && (
        <NewsArticlesContainer official={props.officialObject.official.name} />
      )}

      {props.funders && <FundingContainer funders={props.funders} />}

      <MessageBoardContainer />

      {/* <div className="disqus-container">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div> */}
    </div>
  )
}

export default OfficialView
