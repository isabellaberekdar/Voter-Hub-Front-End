import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import RoutesContainer from "./components/routes/RoutesContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RoutesContainer />
      </header>
    </div>
  );
}

export default App

