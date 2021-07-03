import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import {Home, SignIn, Users} from "./pages";

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/login" render={(props) => <SignIn {...props.location} />}/>
                <Route path="/users" render={(props) => <Users {...props.location} />}/>
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
