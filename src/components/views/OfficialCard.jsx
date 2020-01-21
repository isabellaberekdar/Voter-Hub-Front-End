import React from "react"
// import PropTypes from "prop-types";

import "../views/OfficialCard.css"

const OfficialCard = props => {
  // console.log(props.office.divisionId)
  // console.log(props.officeIndex)
  // console.log(props.officialIndex)
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
          // console.log(props.official.address[0][key])
          lines.push(<p>{props.official.address[0][key]}</p>)
        } else if (key === "city") {
          // console.log(props.official.address[0][key])
          line2 = line2 + props.official.address[0][key]
        } else if (key === "state") {
          // console.log(props.official.address[0][key])
          line2 = line2 + ", " + props.official.address[0][key]
        } else if (key === "zip") {
          // console.log(props.official.address[0][key])
          line2 = line2 + " " + props.official.address[0][key]
        }
      }
      addressLines.push(lines)
      addressLines.push(<p>{line2}</p>)
    }
  }

  return (
    <div className="official-card">
      <a href={officialPageUrl}>officialPageUrl</a>
      <center>
        <h2 id="office-name">
          <b>{props.office.name}</b>
        </h2>
        <h3>{props.official.name}</h3>
        <p>
          <b>Party: </b>
          {props.official.party}
        </p>
      </center>
      {/* <p>{props.office.divisionId}</p> */}
      {/* Some offices don't have levels or roles, so we need to check if they have them before trying to access them by index, or else it will result in an error. */}
      {/* {props.office.levels ? <p>{props.office.levels[0]}</p> : <div></div>}
      {props.office.roles ? <p>{props.office.roles[0]}</p> : <div></div>} */}

      {props.official.photoUrl ? (
        <center>
          <img src={props.official.photoUrl} width="130px" />
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
