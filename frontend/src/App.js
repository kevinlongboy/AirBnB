import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Spots } from "./components/Spots/Spots";
import SpotPage from "./components/SpotPage/SpotPage";
import Footer from "./components/Footer/Footer.js"
import Host from "./components/Host/Host";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import Listings from "./components/Listings/Listings";

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

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path="/">
            <Spots />
          </Route>


          <Route exact path={'/spots/:spotId'}>
            <SpotPage />
          </Route>

          <Route exact path={'/hosting'}>
            <Host />
          </Route>

          <Route exact path={'/hosting/create'}>
            <CreateSpot />
          </Route>

          <Route exact path={'/hosting/listings'}>
            <Listings />
          </Route>

        </Switch>
      )}

      {/* <Footer /> */}
    </>
  );
}

export default App;
