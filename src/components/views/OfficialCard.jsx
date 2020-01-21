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

  // Officials can have anywhere from 0 to 3 channels! We will need to first see if they have any channels at all. If they do, we will then need to iterate through them to generate the elements. Ideally, we should be able to identify the domain of the channel, so that we can link to it directly. eg. https://www.facebook.com/newyorkstateag/ when the type is "Facebook"
  let channels = []
  if (props.official.channels) {
    for (let key in props.official.channels) {
      if (props.official.channels.hasOwnProperty(key)) {
        if (props.official.channels[key].type == "Facebook") {
          channels.push(
            <p>
              <a
                href={
                  "https://www.facebook.com/" + props.official.channels[key].id
                }
                target="blank"
              >
                https://www.facebook.com/{props.official.channels[key].id}
              </a>
            </p>
          )
        } else if (props.official.channels[key].type == "Twitter") {
          channels.push(
            <p>
              <a
                href={"https://twitter.com/" + props.official.channels[key].id}
                target="blank"
              >
                https://twitter.com/{props.official.channels[key].id}
              </a>
            </p>
          )
        } else if (props.official.channels[key].type == "YouTube") {
          channels.push(
            <p>
              <a
                href={
                  "https://www.youtube.com/user/" +
                  props.official.channels[key].id
                }
                target="blank"
              >
                https://www.youtube.com/user/{props.official.channels[key].id}
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

  return (
    <div className="official-card">
      {/* <a href={officialPageUrl}>officialPageUrl</a> */}
      <center>
        <h2 id="office-name">
          <a href={officialPageUrl}>
            <b>{props.office.name}</b>
          </a>
        </h2>
        <h3>
          <a href={officialPageUrl}>{props.official.name}</a>
        </h3>
        <p>
          <b>Party: </b>
          {props.official.party}
        </p>
      </center>

      {props.official.photoUrl ? (
        <center>
          <a href={officialPageUrl}>
            <img src={props.official.photoUrl} width="130px" />
          </a>
        </center>
      ) : (
        <center>
          <img
            src="./images/placeholder.png"
            target="blank"
            height="162.5px"
          ></img>
        </center>
      )}

      {props.official.address ? <div>{addressLines}</div> : <div></div>}
      {/* Officials will usually have one phone, url, and email */}
      {props.official.phones ? <p>{props.official.phones[0]}</p> : <div></div>}
      {props.official.urls ? (
        <a href={props.official.urls[0]} target="blank">
          {props.official.urls[0]}{" "}
        </a>
      ) : (
        <div></div>
      )}
      {props.official.emails ? (
        <p>
          <a href={"mailto:" + props.official.emails[0]} target="blank">
            {props.official.emails[0]}
          </a>
        </p>
      ) : (
        <div></div>
      )}
      {channels}
    </div>
  )
}

// StudentCard.propTypes = {
//   image: PropTypes.string.isRequired,
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   campus: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
//   buttonText: PropTypes.string.isRequired
// };

export default OfficialCard
