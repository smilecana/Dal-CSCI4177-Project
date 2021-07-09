import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import {Home, Register, Users, Detail} from "./pages";

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/register"  component={Register}/>
                <Route path="/users" exact render={(props) => <Users {...props.location} />}/>
                <Route path="/users/:id" component={Detail} />
                <Route path="/users/:id/edit" component={Register} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
