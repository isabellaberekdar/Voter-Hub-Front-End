import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import { HomeContainer, NotFound, RepresentativeContainer } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path='/' component={Homepage} /> */}
          <Route exact path="/home" component={HomeContainer} />
          <Route
            exact
            path="/representative"
            component={RepresentativeContainer}
          />
          <Route component={NotFound} />
          <div></div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
