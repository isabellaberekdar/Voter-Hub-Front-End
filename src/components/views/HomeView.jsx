import React from "react"

import { OfficialCard } from ".."
import "./Home.css"

const HomeView = props => {
  // console.log("meow", props.data)
  let officialCards = []

  if (props.store) {
    // let officials_info = [];
    // console.log(props.store.divisions[1].officeIndices);

    if (props.store.divisions) {
      for (let key in props.store.divisions) {
        if (props.store.divisions.hasOwnProperty(key)) {
          // print out the division key and a single division object
          // console.log("DIVISION", key, props.store.divisions[key]);
          for (
            let i = 0;
            i < props.store.divisions[key].officeIndices.length;
            i++
          ) {
            // print out the office's index within just their division
            // console.log("OFFICE in division", i);
            // print out the office object
            // console.log(
            //   props.store.offices[props.store.divisions[key].officeIndices[i]]
            // );
            // print out the office's index in the entire offices array, and the office object
            // console.log(
            //   "OFFICE",
            //   props.store.divisions[key].officeIndices[i],
            //   props.store.offices[props.store.divisions[key].officeIndices[i]]
            // );
            // props.store.divisions[key].officeIndices[i] is the office index
            for (
              let j = 0;
              j <
              props.store.offices[props.store.divisions[key].officeIndices[i]]
                .officialIndices.length;
              j++
            ) {
              // print out the official's index within just their division
              // console.log("OFFICIAL in division", j);
              // print out the official object
              // console.log(
              //   props.store.officials[
              //     props.store.offices[
              //       props.store.divisions[key].officeIndices[i]
              //     ].officialIndices[j]
              //   ]
              // );
              // console.log(
              //   key,
              //   i,
              //   j,
              //   props.store.officials[
              //     props.store.offices[
              //       props.store.divisions[key].officeIndices[i]
              //     ].officialIndices[j]
              //   ]
              // )

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
              // print out the official's index in the entire officials array, and the official object
              // console.log(
              //   "OFFICIAL",
              //   props.store.offices[props.store.divisions[key].officeIndices[i]]
              //     .officialIndices[j],
              //   props.store.officials[
              //     props.store.offices[
              //       props.store.divisions[key].officeIndices[i]
              //     ].officialIndices[j]
              //   ]
              // );
            }
          }
        }
      }
    }

    // for (let i = 0; i < props.store.offices.length; i++) {
    //   // console.log(props.store.offices[i]);
    //   for (let j = 0; j < props.store.offices[i].officialIndices.length; j++) {
    //     // console.log(props.store.offices[i].officialIndices[j]);
    //     // officials_info[props.store.offices[i].officialIndices[j]] = {
    //     //   office: props.store.offices[i],
    //     //   official:
    //     //     props.store.officials[props.store.offices[i].officialIndices[j]]
    //     // };
    //     console.log(i, j);
    //     officialCards.push(
    //       <OfficialCard
    //         office={props.store.offices[i]}
    //         official={
    //           props.store.officials[props.store.offices[i].officialIndices[j]]
    //         }
    //         officeIndex={i}
    //         officialIndex={j}
    //       />
    //     );
    //   }
    // }
    // console.log(officials_info);
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
