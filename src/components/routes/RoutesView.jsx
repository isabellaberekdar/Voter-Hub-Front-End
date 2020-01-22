import React from "react"
import { Switch, Route } from "react-router-dom"
import { Login, Signup, Logout } from "../containers"
import { HomeContainer, NotFound, OfficialContainer } from "../../components"
import MessageBoardCollectionContainer from '../containers/MessageBoardCollection';
import MessageBoard from "../containers/MessageBoard";
import Thread from "../containers/Thread";


const RoutesView = props => {
  const { isLoggedIn } = props

  return (
    <Switch>
      {/* Routes placed within this section are available to all visitors */}
      <Route exact path="/" component={HomeContainer} id="homepage"/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/messageboardcontainer" component={MessageBoardCollectionContainer}/>
      <Route exact path="/messageboard" component={MessageBoard}/>
      <Route exact path="/thread/:threadId" component={Thread}/>
      {/* placeOrCounty and placeOrCountyName are optional */}
      <Route
        exact
        path="/official/:division/:officeIndex/:officialIndex"
        component={OfficialContainer}
      />
      {/*         <Route exact path="/Official" component={OfficialContainer} />
       */}{" "}
      <Route component={NotFound} />
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
  )
}

export default RoutesView
