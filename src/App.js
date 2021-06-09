import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import {Home, SignIn} from "./component";

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/signin" render={(props) => <SignIn {...props.location} />}/>
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
