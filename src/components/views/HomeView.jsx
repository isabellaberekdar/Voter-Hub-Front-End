import React from "react"

import { OfficialCard } from ".."
import "./Home.css"

const HomeView = props => {
  // console.log(props)
  let officialCards = []

  if (props.store) {
    if (props.store.divisions) {
      for (let key in props.store.divisions) {
        if (props.store.divisions.hasOwnProperty(key)) {
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

  // console.log(props);
  return (
    <div>
      <div className="header">
        <img
          src="/images/homeheader.png"
          alt="header of homepage"
          width="100%"
        />
        <div className="centered">
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              name="address"
              placeholder={props.placeholderText}
              onFocus={props.focusFunc}
              onblur={props.unfocusFunc}
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
