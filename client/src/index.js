import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  // If a returning user has a session token in localStorage
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    store = configureStore({});
  }

  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});
