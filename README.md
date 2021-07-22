
# CSCI4177 Project

* *Date Created*: 24 May 2021
* *Last Modification Date*: 21 July 2021
* *URL*: https://github.com/Aref19a/4177-project


## Authors

* [HanaPark](hn946002@dal.ca) - *(contributor)*
* [Ty Fetinko](ty667216@dal.ca) - *(contributor)*
* [Aref Abdipoor](aref.adbi@dal.ca) - *(contributor)*
* [Brady MacDonald](brady.macdonald@dal.ca) - *(contributor)*
* [Ryan McInroy](ry624227@dal.ca) - *(contributor)*


# Assignment3
##UserProfileManagement
My part is the UserProfile Management
I made new branch as [hana-loginAndRegister](https://github.com/Aref19a/4177-project/tree/hana-loginAndRegister)

The following files are added for user profile management:
###View
src/pages/SignIn.js

src/pages/Register.js

src/pages/UserProfile.js

###css
src/assets/css/Register.css

src/assets/css/SignIn.css

src/assets/css/Common.css
###Routes
backend/routes/users.js
###Models
backend/models/User.js

###component
It also includes user authentication.
* src/component/authentication.js
* src/component/PrivateRoute.js

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

### Prerequisites

Make sure you have installed all of the following prerequisites:

* Git - Download & Install Git. OSX and Linux machines typically have this already installed.
* Node.js - Download & Install Node.js and the npm package manager. If you encounter any problems, you can also use this GitHub Gist to install Node.js.

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing

### Cloning The GitLab Repository
```bash
$ git clone https://github.com/Aref19a/4177-project.git
```

### Running Your Application
Move to the repository folder
```bash
$ cd CSCI-4177-Project
```

Install your application using npm:
```bash
$ npm install
```

Run your application using npm:
```bash
$ npm run dev
```
## Deployment

By clicking the button below you can signup for Heroku and deploy a working copy of MEANJS to the cloud without having to do the steps above.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://csci4177-project.herokuapp.com/)

## Sources Used
### authentication.js
I used jwt for authentication.

*Lines - 05*

```
const decode = jsonwebtoken.verify(localStorage.getItem('lmsToken'), 'lmsPlatform');
```

The code above was created by adapting the code in [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) as shown below:

```
var decoded = jwt.decode(token, {complete: true});
```
### PrivateRoute.js
I applied the code for the authentication.

*Lines - 04 ~ 09*

```
const PrivateRoute = ({component: Component, auth, ...rest}) => {
    return (<Route {...rest}
                   render={(props) => {
                       return auth ? <Component {...props} /> : <Redirect to="/login"/>
                   }}/>)
}
```

The code above was created by adapting the code in [Coder Who Dreams](https://coderwhodreams.com/blog/creating-private-routes-and-handling-session-in-react-js/) as shown below:

```
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem(ACCESS_TOKEN_NAME) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
export default PrivateRoute;
```
### index.js
I applied the code for password security.
It is uses hash password.

*Lines - 12 ~ 14*
```
    const user = await User.findOne({email: req.body.email})
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            //do something
        }
```
The code above was created by adapting the code in [bcrypt](https://www.npmjs.com/package/bcrypt) as shown below:
```
async function checkUser(username, password) {
    //... fetch user from a db etc.

    const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login
    }

    //...
}

```

*Lines - 69 ~ 70*
```
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
```
The code above was created by adapting the code in [How to usehashfunctioninbcrypt](https://www.tabnine.com/code/javascript/functions/bcrypt/hash) as shown below:

```
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
```
I also checked using await / async.
[Javascript Info](https://javascript.info/async-await)


## Built With

* [Node.js](https://nodejs.org/en/)
