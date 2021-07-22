import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Assignments, Home, Register, SignIn, UserProfile} from "./pages";
import PrivateRoute from "./component/PrivateRoute";
import authentication from "./component/authentication";
import PageHeader from "./component/PageHeader";

const App = () => {
    return (
        <>
            <PageHeader data={authentication()}/>
            <Router>
                <Switch>
                    {<Route path="/register" component={Register}/>}
                    {<Route path="/login" exact>
                        <SignIn auth={authentication()} />
                    </Route>}
                    {<PrivateRoute path="/assignments" component={Assignments} auth={authentication()} />}
                    {<PrivateRoute path="/user">
                        {<PrivateRoute path="/:id" component={UserProfile}  data = {authentication()} auth={authentication()} />}
                    </PrivateRoute>}
                    {<PrivateRoute path="/" exact component={Home} auth={authentication()} />}
                </Switch>
            </Router>
        </>
    );
}

export default App;