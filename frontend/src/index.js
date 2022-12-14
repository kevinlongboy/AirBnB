/******************************** IMPORTS ********************************/
// libraries
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// local files
import configureStore from "./store";
import * as sessionActions from "./store/sessionReducer";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import { ModalProvider } from "./context/Modal";
import App from "./App";
import "./index.css";

/************* conditional components **************/
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


/******************************* COMPONENT *******************************/
function Root() {

  /**************** render component *****************/
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
