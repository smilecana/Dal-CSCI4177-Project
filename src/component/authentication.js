const jsonwebtoken = require('jsonwebtoken');

const authentication = auth => {
    console.log(auth);
    if (localStorage.getItem('lmsToken')) {
        auth = jsonwebtoken.verify(localStorage.getItem('lmsToken'), 'lmsPlatform')
        return auth;
    }
    return {};
}
export default authentication;

