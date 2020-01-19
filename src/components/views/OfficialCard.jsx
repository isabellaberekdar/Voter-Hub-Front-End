import React from "react";
import PropTypes from "prop-types";

// import "../views/OfficialCard.css";

const OfficialCard = props => {
  console.log(props);
  console.log(props.official.address);
  return (
    <div>
      <h3>OfficialCard here</h3>
      <p>{props.office.name}</p>
      <p>{props.office.divisionId}</p>

      {/* Some offices don't have levels or roles, so we need to check if they have them before trying to access them by index, or else it will result in an error. */}
      {props.office.levels ? <p>{props.office.levels[0]}</p> : <div></div>}
      {props.office.roles ? <p>{props.office.roles[0]}</p> : <div></div>}

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
      {/*  */}
      {/*  */}
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
