import React from "react";

import { OfficialCard } from "..";

// If you need cards or styling, you can uncomment the lines here to import
// import "./HomeView.css";
// import { OfficialCard } from "../";

const HomeView = props => {
  // console.log("meow", props.data);
  let officialCards = [];
  for (let i = 0; i < props.length; i++) {
    officialCards.push(
      <OfficialCard
        division="division here"
        office="office here"
        official={this.props.officials[i]}
      />
    );
  }
  return (
    <div>
      <h2>HomeView here</h2>
      <form onSubmit={props.handleSubmit}>
        <label>Your address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter your address here..."
          onChange={props.handleChange}
          value={props.address_input}
        />
        <input className="test-submit-button" type="submit" />
      </form>

      {officialCards}
    </div>
  );
};

export default HomeView;
