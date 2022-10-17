/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignUpForm from "./components/Navigation/NoSession/SignUpForm";
// local files
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotPage from "./components/Spots/SpotPage";
import UserSpots from "./components/Spots/UserSpots";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import UpdateSpotForm from "./components/Spots/UpdateSpotForm";
import UserReviews from "./components/Reviews/UserReviews"
import UpdateReviewForm from "./components/Reviews/UpdateReviewForm";
import Footer from "./components/Footer/index.js"
// import Host from "./components/Host/Host"; // yeet


/******************************* COMPONENT *******************************/
function App() {

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  /**************** render component *****************/
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
            <UpdateSpotForm />
          </Route>

          <Route exact path={'/hosting'}>
            <CreateSpotForm />
          </Route>

          <Route exact path={'/reviews'}>
            <UserReviews />
          </Route>

          <Route exact path={'/reviews/:reviewId/edit'}>
            <UpdateReviewForm />
          </Route>


          {/* <Route exact path={'/legacy/host'}>
            <Host />
          </Route>

         <Route exact path={"/legacy/signup"}>
            <SignUpForm />
          </Route> */}

        </Switch>
      )}

      {/* <Footer /> */}
    </>
  );
}


/******************************** EXPORTS ********************************/
export default App;
