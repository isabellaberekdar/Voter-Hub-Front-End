import React from "react";

import { OfficialCard } from "..";

// If you need cards or styling, you can uncomment the lines here to import
// import "./HomeView.css";
// import { OfficialCard } from "../";

const HomeView = props => {
  // console.log("meow", props.data);
  let officialCards = [];

  if (props.store) {
    // let officials_info = [];
    for (let i = 0; i < props.store.offices.length; i++) {
      // console.log(props.store.offices[i]);
      for (let j = 0; j < props.store.offices[i].officialIndices.length; j++) {
        // console.log(props.store.offices[i].officialIndices[j]);
        // officials_info[props.store.offices[i].officialIndices[j]] = {
        //   office: props.store.offices[i],
        //   official:
        //     props.store.officials[props.store.offices[i].officialIndices[j]]
        // };
        officialCards.push(
          <OfficialCard
            office={props.store.offices[i]}
            official={
              props.store.officials[props.store.offices[i].officialIndices[j]]
            }
          />
        );
      }
    }
    // console.log(officials_info);
  }

  console.log(props);
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
