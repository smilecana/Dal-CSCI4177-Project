import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Assignments, Home, Register, SignIn} from "./pages";
import PrivateRoute from "./component/PrivateRoute";
import authentication from "./component/authentication";
import Profile from "./pages/Profile";

const App = () => {
    return (
        <Router>
            <Switch>
                {<Route path="/register" component={Register}/>}
                {<Route path="/login" exact>
                    <SignIn authed={authentication()}/>
                </Route>
                }
                {<PrivateRoute path="/assignments" component={Assignments} auth={authentication()}/>}
                {<PrivateRoute path="/" exact component={Home} auth={authentication()}/>}
            </Switch>
        </Router>
    );
}

export default App;