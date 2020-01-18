import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import { HomeContainer, NotFound, OfficialContainer } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <navbar>Navbar here</navbar>
        <Switch>
          {/* <Route exact path='/' component={Homepage} /> */}
          <Route exact path="/home" component={HomeContainer} />
          <Route exact path="/Official" component={OfficialContainer} />
          <Route component={NotFound} />
          <div></div>
        </Switch>
        <footer>Footer here</footer>
      </Router>
    </div>
  );
}

export default App;
