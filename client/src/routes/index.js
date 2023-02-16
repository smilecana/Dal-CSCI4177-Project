import React, { useContext, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import * as ActionTypes from "../utils/actionTypes";
import jwtDecode from "jwt-decode";
import { AppContext } from "../context/userContext";
import Error from "../utils/error";
import { ROUTES, TOKEN } from "../utils/constants";

import {
  Home,
  Signup,
  Login,
  Assignments,
  Grades,
  UserProfile,
  Calendar,
} from "../pages";

const Rounting = () => {
  const { initializeAuth, dispatch } = useContext(AppContext);
  const location = useLocation();
  const openPages = [
    {
      pageLink: ROUTES.HOMEPAGE,
      view: Home,
    },
    {
      pageLink: ROUTES.LOGIN,
      view: Login,
    },
    {
      pageLink: ROUTES.SIGNUP,
      view: Signup,
    },
    {
      pageLink: ROUTES.GRADES,
      view: Grades,
    },
    {
      pageLink: ROUTES.ASSIGNMENTS,
      view: Assignments,
    },
    {
      pageLink: ROUTES.PROFILE,
      view: UserProfile,
    },
    {
      pageLink: ROUTES.CALENDAR,
      view: Calendar,
    },
    {
      pageLink: ROUTES.ERROR,
      view: Error,
    }
  ];

  useEffect(() => {
    initializeAuth();
    if (localStorage.getItem(TOKEN)) {
      const token = localStorage.getItem(TOKEN);
      const decode = jwtDecode(token);
      const expiresAt = decode.exp;
      const currentTime = Date.now();

      if (expiresAt < currentTime / 1000) {
        dispatch({ type: ActionTypes.LOGOUT });
      }
    }
  }, []);

  const routes = (
    <Routes location={location}>
      {openPages.map((page, index) => {
        return (
          <Route
            exact
            path={page.pageLink}
            element={<page.view />}
            key={index}
          />
        );
      })}
      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ERROR} />} />
    </Routes>
  );
  return <div className="container">{routes}</div>
}

export default Rounting;