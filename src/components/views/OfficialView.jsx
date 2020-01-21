import React from "react"
import Disqus from "disqus-react"
import NewsArticlesContainer from '../views/NewsArticlesContainer'


// If you need cards or styling, you can uncomment the lines here to import
// import { OfficialCard } from "..";
import "./OfficialView.css"

const OfficialView = props => {
  // Disqus configuration information
  const disqusShortname = "voterbundle" //found in your Disqus.com dashboard
  const disqusConfig = {
    url: "http://localhost:3000", //this.props.pageUrl
    identifier: "article-id", //this.props.uniqueId
    title: "Title of Your Article" //this.props.title
  }

  // console.log("parsnip", props)
  let output = []
  let divisionId = ""
  let office = {}
  let official = {}
  if (props.officialObject) {
    divisionId = props.officialObject.office.divisionId
    office = props.officialObject.office
    official = props.officialObject.official
  }

  let firstName = ""
  let lastName = ""
  if (official.name) {
    firstName = official.name.substring(0, official.name.lastIndexOf(" "))
    lastName = official.name.substring(official.name.lastIndexOf(" ") + 1)
  }
  console.log(office)
  console.log(official)

  // Officials can have anywhere from 0 to 3 channels! We will need to first see if they have any channels at all. If they do, we will then need to iterate through them to generate the elements. Ideally, we should be able to identify the domain of the channel, so that we can link to it directly. eg. https://www.facebook.com/newyorkstateag/ when the type is "Facebook"
  let channels = []
  if (official.channels) {
    for (let key in official.channels) {
      if (official.channels.hasOwnProperty(key)) {
        if (official.channels[key].type == "Facebook") {
          channels.push(
            <p>
              <a
                href={"https://www.facebook.com/" + official.channels[key].id}
                target="blank"
              >
                <img className="social-icon" src="/images/socialfacebook.svg" />
              </a>
            </p>
          )
        } else if (official.channels[key].type == "Twitter") {
          channels.push(
            <p>
              <a
                href={"https://twitter.com/" + official.channels[key].id}
                target="blank"
              >
                <img className="social-icon" src="/images/socialtwitter.svg" />
              </a>
            </p>
          )
        } else if (official.channels[key].type == "YouTube") {
          channels.push(
            <p>
              <a
                href={
                  "https://www.youtube.com/user/" + official.channels[key].id
                }
                target="blank"
              >
                <img className="social-icon" src="/images/socialyoutube.svg" />
              </a>
            </p>
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

  console.log(office)
  return (
    <div>
      {/* <h2>OfficialView here</h2> */}

      <div className="triptych">
        <div className="portrait">
          {official.photoUrl ? (
            <center>
              <img src={official.photoUrl}/>
            </center>
          ) : (
            <center>
              <img
                src="/images/placeholder.png"
                target="blank"
              ></img>
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
      {props.officialObject && <NewsArticlesContainer official={props.officialObject.official.name} />}

      <div className="disqus-container">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </div>
  )
}

export default OfficialView
