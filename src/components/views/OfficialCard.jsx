import React from "react";
import PropTypes from "prop-types";

import "../views/OfficialCard.css";

const OfficialCard = props => {
  console.log(props);
  console.log(props.official.address);
  return (
    <div className="official-card">
      <h3>OfficialCard here</h3>
      <p>{props.office.name}</p>
      <p>{props.office.divisionId}</p>

      {/* Some offices don't have levels or roles, so we need to check if they have them before trying to access them by index, or else it will result in an error. */}
      {props.office.levels ? <p>{props.office.levels[0]}</p> : <div></div>}
      {props.office.roles ? <p>{props.office.roles[0]}</p> : <div></div>}

      <p>{props.official.name}</p>
      <p>{props.official.party}</p>
      {props.official.photoUrl ? (
        <img src={props.official.photoUrl} width="200px" />
      ) : (
        <div></div>
      )}

      {/* Some officials don't have an address. */}
      {/* The address is an array holding a single object. */}
      {props.official.address ? (
        <div>
          <p>{props.official.address[0].line1}</p>
          <p>{props.official.address[0].city}</p>
          <p>{props.official.address[0].state}</p>
          <p>{props.official.address[0].zip}</p>
        </div>
      ) : (
        <div></div>
      )}

      {/*  */}
      {props.official.phones ? <p>{props.official.phones[0]}</p> : <div></div>}
      {/*  */}
      {props.official.urls ? <p>{props.official.urls[0]}</p> : <div></div>}
      {/*  */}
      {props.official.emails ? <p>{props.official.emails[0]}</p> : <div></div>}
      {/*  */}
      {props.official.channels ? (
        <p>
          {props.official.channels[0].type}: {props.official.channels[0].id}
        </p>
      ) : (
        <div></div>
      )}
    </div>
  );
};

// StudentCard.propTypes = {
//   image: PropTypes.string.isRequired,
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   campus: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
//   buttonText: PropTypes.string.isRequired
// };

export default OfficialCard;
