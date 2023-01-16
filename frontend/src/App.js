/******************************** IMPORTS ********************************/
// libraries
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
// local files
import * as sessionActions from "./store/sessionReducer";
import Navigation from "./components/Navigation";
import AllSpots from "./components/Spots/AllSpots";
import SpotPage from "./components/Spots/SpotPage";
import UserSpots from "./components/Spots/UserSpots";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import UpdateSpotForm from "./components/Spots/UpdateSpotForm";
import UserReviews from "./components/Reviews/UserReviews"
import UserBookings from "./components/Bookings/UserBookings";
import UserReservations from "./components/Bookings/UserReservations";
import BookingConfirmationPage from "./components/Bookings/BookingConfirmationPage";
import ManageBookingPage from "./components/Bookings/ManageBookingPage";
import SearchResultsPage from "./components/Search/SearchResultsPage";


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
    <Navigation isLoaded={isLoaded} exact path="/"/>

      {isLoaded && (
        <Switch>


          {/* SPOTS */}
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


          {/* REVIEWS */}
          <Route exact path={'/reviews'}>
            <UserReviews />
          </Route>


          {/* BOOKINGS */}
          <Route exact path={'/trips'}>
            <UserBookings />
          </Route>

          <Route exact path={'/confirmation/trips/:tripId'}>
            <BookingConfirmationPage />
          </Route>

          <Route exact path={'/trips/:tripId/edit'}>
            <ManageBookingPage />
          </Route>

          <Route exact path={'/reservations'}>
            <UserReservations />
          </Route>


          {/* SEARCH */}
          <Route exact path={'/spots?'}>
            <SearchResultsPage />
          </Route>


        {/* <Route>
          Page Not Found
        </Route> */}

        </Switch>
      )}
    </>
  );
}


/******************************** EXPORTS ********************************/
export default App;
