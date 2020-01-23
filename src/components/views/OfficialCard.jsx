import React from "react"
// import PropTypes from "prop-types";

import "../views/OfficialCard.css"

const OfficialCard = props => {
  // console.log("CARD PROPS", props)

  let officialPageUrl =
    "/" +
    "official" +
    "/" +
    props.division.replace(/\//gi, "%2F").replace(/:/gi, "%3A") +
    "/" +
    props.officeIndex +
    "/" +
    props.officialIndex
  // console.log(officialPageUrl)

  // Officials can have anywhere from 0 to 3 channels! We will need to first see if they have any channels at all.
  // If they do, we will then need to iterate through them to generate the elements.
  // Ideally, we should be able to identify the domain of the channel, so that we can link to it directly.
  // eg. https://www.facebook.com/newyorkstateag/ when the type is "Facebook"
  let channels = []
  if (props.official.channels) {
    for (let key in props.official.channels) {
      if (props.official.channels.hasOwnProperty(key)) {
        if (props.official.channels[key].type == "Facebook") {
          channels.push(
            // <p>
            <a
              href={
                "https://www.facebook.com/" + props.official.channels[key].id
              }
              target="blank"
              id="icon"
            >
              <img
                src="/images/facebook-card.svg"
                alt="homepage-icon"
                width="19px"
                height="19px"
              />
            </a>
            // </p>
          )
        } else if (props.official.channels[key].type == "Twitter") {
          channels.push(
            // <p>
            <a
              href={"https://twitter.com/" + props.official.channels[key].id}
              target="blank"
              id="icon"
            >
              <img
                src="/images/twitter-card.svg"
                alt="homepage-icon"
                width="19px"
                height="19px"
              />
            </a>
            // </p>
          )
        } else if (props.official.channels[key].type == "YouTube") {
          channels.push(
            // <p>
            <a
              href={
                "https://www.youtube.com/user/" +
                props.official.channels[key].id
              }
              target="blank"
              id="icon"
            >
              <img
                src="/images/youtube-card.svg"
                alt="homepage-icon"
                width="19px"
                height="19px"
              />
            </a>
            // </p>
          )
        }
      }
    }
  }

  // Some officials don't have an address.
  // The address is an array holding a single object of address lines. Kind of weird.
  // Some addresses have a line2 and line3 etc in addition to just a line1 (Andrew M. Cuomo). So we'll have to iterate through them somehow, ignoring any that are just blank strings "".
  let addressLines = []
  if (props.official.address) {
    if (props.official.address.hasOwnProperty(0)) {
      let lines = []
      let line2 = ""
      for (let key in props.official.address[0]) {
        if (["line1", "line2", "line3", "line4"].includes(key)) {
          lines.push(<p>{props.official.address[0][key]}</p>)
        } else if (key === "city") {
          line2 = line2 + props.official.address[0][key]
        } else if (key === "state") {
          line2 = line2 + ", " + props.official.address[0][key]
        } else if (key === "zip") {
          line2 = line2 + " " + props.official.address[0][key]
        }
      }
      addressLines.push(lines)
      addressLines.push(<p>{line2}</p>)
    }
  }

  console.log("SAEJFILSJEIFALESFILAS", typeof props.office.name)

  return (
    <div className="official-card">
      {props.official.photoUrl ? (
        <a href={officialPageUrl}>
          <img
            src={props.official.photoUrl}
            target="blank"
            width="240px"
            height="300px"
            className="image"
            onError={e => {
              e.target.onerror = null
              e.target.src = "/images/placeholder.png"
            }}
          />
        </a>
      ) : (
        <a href={officialPageUrl}>
          <img
            src="/images/placeholder.png"
            target="blank"
            width="240px"
            height="300px"
            className="image"
          ></img>
        </a>
      )}

      <div className="official-content">
        <h2 id="office-name">
          <a href={officialPageUrl}>
            <b>{props.office.name}</b>
          </a>
        </h2>
        <h3 id="officials-name">
          <a href={officialPageUrl} target="blank">
            {props.official.name}
          </a>
        </h3>
        <p id="party">{props.official.party}</p>

        <p id="address">
          {props.official.address ? <div>{addressLines}</div> : <div></div>}
        </p>

        {/* Officials will usually have one phone, url, and email */}
        {props.official.phones ? (
          <p id="phone-num">{props.official.phones[0]}</p>
        ) : (
          <div></div>
        )}
        {props.official.urls ? (
          <a href={props.official.urls[0]} target="blank" id="channels">
            Official Website
          </a>
        ) : (
          <div></div>
        )}
        {props.official.emails ? (
          <p id="mail">
            <a href={"mailto:" + props.official.emails[0]} target="blank">
              {props.official.emails[0]}
            </a>
          </p>
        ) : (
          <div></div>
        )}
        <p id="channels">{channels}</p>
      </div>
    </div>
  )
}

export default OfficialCard
