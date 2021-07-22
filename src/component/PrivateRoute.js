import {Route} from "react-router-dom";
import {Redirect} from "react-router";

const PrivateRoute = ({component: Component, auth, ...rest}) => {
    return (<Route {...rest}
                   render={(props) => {
                       return auth ? <Component {...props} /> : <Redirect to="/login"/>
                   }}/>)
}
export default PrivateRoute;
