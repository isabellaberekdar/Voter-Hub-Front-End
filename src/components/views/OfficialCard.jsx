import React from "react";
import PropTypes from "prop-types";

// import "../views/OfficialCard.css";

const OfficialCard = props => {
  return (
    <div>
      <h3>OfficialCard here</h3>
      <p>{props.division}</p>
      <p>{props.office}</p>
      <p>{props.official}</p>
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
