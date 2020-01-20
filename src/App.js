import React, {Component} from "react";
import "./App.css";
import RoutesContainer from "./components/routes/RoutesContainer";
import NavbarContainer from "./components/containers/NavbarContainer";
import Footer from "./components/containers/Footer";

class App extends Component {
  render () {
    return (
      <div className="App">
        <NavbarContainer />
        <RoutesContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
