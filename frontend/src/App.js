import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/LoginFormModal/SignupForm";

import * as sessionActions from "./store/session";
import Main from "./components/Main/Main";
import Spots from "./components/Spots/Spots";
import SpotPage from "./components/SpotPage/SpotPage";
import SpotEdit from "./components/SpotEdit/SpotEdit";
import SpotCreate from "./components/SpotCreate/SpotCreate";
import Reviews from "./components/Reviews/Reviews"
import ReviewEdit from "./components/ReviewEdit/ReviewEdit";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer/Footer.js"

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
            <Main />
          </Route>

          <Route exact path={'/spots'}>
            <Spots />
          </Route>

          <Route exact path={'/spots/:spotId'}>
            <SpotPage />
          </Route>

          <Route exact path={'/spots/:spotId/edit'}>
            <SpotEdit />
          </Route>

          <Route exact path={'/hosting'}>
            <SpotCreate />
          </Route>

          <Route exact path={'/reviews'}>
            <Reviews />
          </Route>

          <Route exact path={'/reviews/:reviewId/edit'}>
            <ReviewEdit />
          </Route>


          {/* <Route exact path={'/legacy/host'}>
            <Host />
          </Route>

         <Route exact path={"/legacy/signup"}>
            <SignupFormPage />
          </Route> */}

        </Switch>
      )}

      {/* <Footer /> */}
    </>
  );
}

export default App;
