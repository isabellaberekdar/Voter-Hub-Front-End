import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { OfficialCard } from ".."
import SearchBar from "./SearchBar"
import "./Home.css"

const HomeView = props => {
  // console.log("pumpkin", props.store)

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
        <div className="centered">
          <h2 className="find-rep-title">Find Your Representatives</h2>
          <h3 className="find-rep-description">
            Enter your full address below to find your representatives, how to
            contact them, their funding records, and their latest social media
            and news mentions!
          </h3>
          <SearchBar
            placeholderText={props.placeholderText}
            focusFunc={props.focusFunc}
            blurFunc={props.blurFunc}
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
            address_input={props.address_input}
            handleScriptLoad={props.handleScriptLoad}
            handleLocationSelect={props.handleLocationSelect}
          />
          {/*           <button onClick={props.updateAddress}>{'Save this as your address'}</button>
           */}{" "}
        </div>
      </div>
      <div className="home-content">
        <center>{officialCards}</center>
        <h3 id="join-discussion-title">Join the Discussion.</h3>
        <div className="row">
          <div className="column" id="one">
            <img src="/images/news.png" alt="news icon" width="50" /> <br></br>
            Read the latest news about <br></br>
            your representatives, straight <br></br>
            from the representative and <br></br>
            trusted news sources.
          </div>
          <div className="column" id="two">
            <img
              src="/images/discourse.png"
              alt="discourse icon"
              width="50px"
            />{" "}
            <br></br>
            Talk and discuss with others in <br></br>
            your districts about your <br></br>
            representatives, issues, and concerns.
          </div>
          <div className="column" id="three">
            <img
              src="/images/whomyrep.png"
              alt="rep question icon"
              width="50px"
            />{" "}
            <br></br>
            Find out who your representatives <br></br>
            are and what they do.
          </div>
        </div>
        <h2 id="sign-up-title">
          Sign up to save your representatives, participate in discussions, and
          more.
        </h2>
        <div className="row">
          <div className="column" id="quick-look">
            <p id="quick-look-title">Quick Look</p>
            <p id="quick-look-text">
              Click to travel straight to these officials’ pages.
            </p>
          </div>
          <div className="column" id="pres">
            <div className="container">
              <img
                src="/images/pres.png"
                alt="pres icon"
                height="230px"
                className="quick"
              />
              <div className="overlay">
                <button className="text">
                  <Link to="/official/ocd-division%2Fcountry%3Aus/0/0">
                    Go to President's Page
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="column" id="vp">
            <div className="container">
              <img
                src="/images/vp.png"
                alt="vp icon"
                height="230px"
                className="quick"
              />
              <div className="overlay">
                <button className="text">
                  <Link to="/official/ocd-division%2Fcountry%3Aus/1/0">
                    Go to Vice President's Page
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="column" id="speaker">
            <div className="container">
              <img
                src="/images/speaker.png"
                alt="speaker icon"
                height="230px"
                className="quick"
              />
              <div className="overlay">
                <button className="text">
                  <Link to="/official/ocd-division%2Fcountry%3Aus%2Fstate%3Aca%2Fcd%3A12/0/0">
                    Go to Speaker of <br></br>the House's Page
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeView
