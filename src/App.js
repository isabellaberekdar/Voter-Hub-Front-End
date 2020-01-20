import React, {Component} from "react";
import "./App.css";
import RoutesContainer from "./components/routes/RoutesContainer";
import NavbarContainer from "./components/containers/NavbarContainer";

class App extends Component {
  render () {
    return (
      <div className="App">
        {/* Navbar is below */}
        <NavbarContainer />
        <RoutesContainer />
      </div>
    );
  }
}

export default App;
