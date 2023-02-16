import React, { useReducer } from "react";
import { createContext, userReducer } from "react";
import * as ActionTypes from "../utils/actionTypes";
import axios from "axios";

import { TOKEN, USER, USER_ID } from "../utils/constants";

const getLoggedInUser = () => {
  let loggedInUser = localStorage.getItem(USER);
  loggedInUser = loggedInUser ? JSON.parse(loggedInUser) : null;
  return loggedInUser;
}

const initialState = {
  currentUser: getLoggedInUser() || {},
  authToken: localStorage.getItem(TOKEN),
  authenticated: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN: 
      localStorage.setItem(TOKEN, action.data);
      return { ...state, authToken: action.data };
    case ActionTypes.SET_CURRENT_USER:
      const user = action.data || {};
      localStorage.setItem(
        USER,
        user && Object.keys(user).length ? JSON.stringify(user) : null
      );
      return { ...state, currentUser: { ...user }} ;
    case ActionTypes.SET_AUTHENTICATED:
      return { ...state, authenticated: action.data };     
    //Logout
    case ActionTypes.LOGOUT:
      delete axios.defaults.headers.common.Authorization;
      localStorage.clear();
      return {
        ...initialState,
        authenticated: false,
        authToken: null,
        currentUser: {}
      };
    default:
      return { ...state }
  }
}
const AppContext = createContext({
  state: initialState,
  dispatch: () => { },
})

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getToken = () => {
    return localStorage.getItem(TOKEN) || null;
  }

  const getCurrentUser = () => {
    return localStorage.getItem(USER)
      ? JSON.parse(localStorage.getItem(USER))
      : {};
  }

  const initializeAuth = (authToken) => {
    const token = authToken || getToken();
    const user = getCurrentUser();

    if (token) {
      axios.defaults.headers.common = {
        Authorization: token,
      };
      dispatch({ type: ActionTypes.SET_TOKEN, data: token });
      dispatch({ type: ActionTypes.SET_CURRENT_USER, data: user });
      dispatch({ type: ActionTypes.SET_AUTHENTICATED, data: true });
    }
  };

  const value = {
    state,
    dispatch,
    initializeAuth,
    getToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };