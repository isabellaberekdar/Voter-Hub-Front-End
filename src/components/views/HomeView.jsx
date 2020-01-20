import React from "react";

import { OfficialCard } from "..";
import "./Home.css";

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
            index={j}
          />
        );
      }
    }
    // console.log(officials_info);
  }

  console.log(props);
  return (
    <div>
      <div className="header">
        <img src="/images/homeheader.png" alt="header of homepage" width="100%" />
        <div className="centered">
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              name="address"
              placeholder="Enter your address to find who represents you..."
              onChange={props.handleChange}
              value={props.address_input}
              id="address-entry"
            />
          </form>
          </div>
        </div>
        <div className="home-content">
          {officialCards}
        </div>
    </div>
  );
};

export default HomeView;