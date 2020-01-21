import React, {Component} from "react";
import "./components/views/Home.css";
import RoutesContainer from "./components/routes/RoutesContainer";
import NavbarContainer from "./components/containers/NavbarContainer";
import Footer from "./components/containers/Footer";

class App extends Component {
  render () {
    return (
      <div className="home-body">
        <NavbarContainer />
        <div className="home-content">
          <RoutesContainer />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
