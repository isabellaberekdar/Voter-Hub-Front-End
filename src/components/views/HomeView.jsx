import React from "react"

import { OfficialCard } from ".."
import "./Home.css"

const HomeView = props => {
  console.log("pumpkin", props.store)

  let officialCards = []
  if (props.store) {
    if (props.store.divisions) {
      for (let key in props.store.divisions) {
        if (props.store.divisions.hasOwnProperty(key)) {
          // Sometimes a division will not have any office indices, so you have to check before trying to access it
          // e.g. "ocd-division/country:us/state:ny/supreme_court:1"
          if (props.store.divisions[key].officeIndices) {
            for (
              let i = 0;
              i < props.store.divisions[key].officeIndices.length;
              i++
            ) {
              for (
                let j = 0;
                j <
                props.store.offices[props.store.divisions[key].officeIndices[i]]
                  .officialIndices.length;
                j++
              ) {
                officialCards.push(
                  <OfficialCard
                    office={
                      props.store.offices[
                        props.store.divisions[key].officeIndices[i]
                      ]
                    }
                    official={
                      props.store.officials[
                        props.store.offices[
                          props.store.divisions[key].officeIndices[i]
                        ].officialIndices[j]
                      ]
                    }
                    division={key}
                    officeIndex={i}
                    officialIndex={j}
                  />
                )
              }
            }
          }
        }
      }
    }
  }

  // console.log(props);
  return (
    <div>
      <div className="header">
        <img
          src="/images/homeheader2.png"
          alt="header of homepage"
          width="100%"
        />
        <div className="centered">
          <h2 className="find-rep-title">Find Your Representatives</h2>
          <h3 className="find-rep-description">
            Enter your full address below to find your representatives, 
            how to contact them, their voting and bill history,
            and their latest social media and news mentions!
          </h3>
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              name="address"
              placeholder={props.placeholderText}
              onFocus={props.focusFunc}
              onBlur={props.blurFunc}
              onChange={props.handleChange}
              value={props.address_input}
              id="address-entry"
            />
          </form>
        </div>
      </div>
      <div className="home-content">
        <center>{officialCards}</center>
      </div>
    </div>
  )
}

export default HomeView
