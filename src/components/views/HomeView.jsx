import React from "react";

import { OfficialCard } from "..";

// If you need cards or styling, you can uncomment the lines here to import
// import "./HomeView.css";
// import { OfficialCard } from "../";

const HomeView = props => {
  console.log("meow", props.data);
  let officialCards = [];

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
              console.log(
                key,
                i,
                j,
                props.store.officials[
                  props.store.offices[
                    props.store.divisions[key].officeIndices[i]
                  ].officialIndices[j]
                ]
              );

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
              );
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
