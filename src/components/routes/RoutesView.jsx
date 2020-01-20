import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Signup } from '../containers';
import { HomeContainer, NotFound, OfficialContainer } from "../../components";

const RoutesView = (props) => {
  const { isLoggedIn } = props;

  return (
    <Switch>
        {/* Routes placed within this section are available to all visitors */}
        {/* <navbar>Navbar here</navbar> */}
        <Route exact path="/" component={HomeContainer} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      
      
        {/* <Route exact path='/' component={Homepage} /> */}
        <Route exact path="/Official" component={OfficialContainer} />
        <Route component={NotFound} />
        <div></div>
        <footer>Footer here</footer>
    

      {/* {isLoggedIn && (
        <Switch> */}
          {/* Routes placed within this section are only available after
          logging in */}
          {/* <Route exact path="/books" component={AllBooksContainer} />
        </Switch>
      )} */}

      {/* Displays our Login component as a fallback */}
      <Route component={Login} />
    </Switch>
  );
}

export default RoutesView;