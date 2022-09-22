import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Spots } from "./components/Spots/Spots";
import SpotPage from "./components/SpotPage/SpotPage";
import Footer from "./components/Footer/Footer.js"

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

          <Route exact path="/">
            <Spots />
          </Route>

          <Route path={'/spots/:spotId'}>
            <SpotPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Spots />
          <Footer />
        </Switch>
      )}

    </>
  );
}

export default App;
