import { Route } from "react-router-dom";
import { Redirect } from "react-router";
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
          <Redirect to="/login" />
        );
      }}
    />
  );
};
export default PrivateRoute;
