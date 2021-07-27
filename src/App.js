import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Assignments, Home, Register, SignIn,Grades, UserProfile, UserLists} from "./pages";
import PrivateRoute from "./component/PrivateRoute";
import authentication from "./component/authentication";
import PageHeader from "./component/PageHeader";


const App = () => {
    return (
        <>
            <Router>
                <PageHeader data={authentication()}/>
                <Switch>
                    {<Route path="/register" component={Register}/>}
                    {<Route path="/login" exact>
                        <SignIn auth={authentication()} />
                    </Route>
                    }
                    {<PrivateRoute path="/assignments" component={Assignments} auth={authentication()} />}
                    {<PrivateRoute path="/grades" component={Grades} auth={authentication()}/>}
                    {<PrivateRoute path="/user/:id" exact component={UserProfile}  data = {authentication()} auth={authentication()} />}
                    {<PrivateRoute path="/admin/users" exact component={UserLists}  data = {authentication()} auth={authentication()} />}
                    {<PrivateRoute path="/admin/users" exact component={UserLists}  data = {authentication()} auth={authentication()} />}
                    {<PrivateRoute path="/admin/users/:id" exact component={UserProfile}  data = {authentication()} auth={authentication()} />}
                    {<PrivateRoute path="/admin/user/add" exact component={Register}  data = {authentication()} auth={authentication()} />}
                    {<PrivateRoute path="/" exact component={Home} auth={authentication()} />}
                </Switch>
            </Router>
        </>
    );
}

export default App;