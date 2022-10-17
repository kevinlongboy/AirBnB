import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignUpForm from "./components/Navigation/NoSession/SignUpForm";

import * as sessionActions from "./store/sessionReducer";
import AllSpots from "./components/Spots/AllSpots";
import UserSpots from "./components/Spots/UserSpots";
import SpotPage from "./components/Spots/SpotPage";
import SpotEdit from "./components/Spots/UpdateSpotForm";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import Reviews from "./components/Reviews/UserReviews"
import ReviewEdit from "./components/Reviews/UpdateReviewForm";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer/index.js"

import Host from "./components/Host/Host"; // yeet

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} path="/"/>

      {isLoaded && (
        <Switch>

          <Route exact path={'/'}>
            <AllSpots />
          </Route>

          <Route exact path={'/spots'}>
            <UserSpots />
          </Route>

          <Route exact path={'/spots/:spotId'}>
            <SpotPage />
          </Route>

          <Route exact path={'/spots/:spotId/edit'}>
            <SpotEdit />
          </Route>

          <Route exact path={'/hosting'}>
            <CreateSpotForm />
          </Route>

          <Route exact path={'/reviews'}>
            <Reviews />
          </Route>

          <Route exact path={'/reviews/:reviewId/edit'}>
            <ReviewEdit />
          </Route>


          <Route exact path={'/legacy/host'}>
            <Host />
          </Route>

         <Route exact path={"/legacy/signup"}>
            <SignUpForm />
          </Route>

        </Switch>
      )}

      {/* <Footer /> */}
    </>
  );
}

export default App;
