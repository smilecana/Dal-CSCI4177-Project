import React from 'react';
import { Route, Navigate } from "react-router-dom";
import authentication from "./authentication";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return authentication() &&
          Object.keys(authentication()).length !== 0 ? (
          <Component {...props} data={auth} />
        ) : (
          <Navigate to="/login" />
        );
      }}
    />
  );
};
export default PrivateRoute;
