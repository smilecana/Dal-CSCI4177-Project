import React from "react";
import {BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import {
    Assignments,
    Home,
    Register,
    SignIn,
    Grades,
    UserProfile,
    Calendar
} from "./pages";
import PrivateRoute from "./component/PrivateRoute";

const App = () => {

  return (
    <>
      <Router>
          <PageHeader/>
      </Router>
    </>
  );
};

export default App;
