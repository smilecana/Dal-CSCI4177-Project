const jsonwebtoken = require('jsonwebtoken');

const authentication = () => {
    if (localStorage.getItem('lmsToken')) {
        const decode = jsonwebtoken.verify(localStorage.getItem('lmsToken'), 'lmsPlatform');
        return !!decode;
    }
    return false;
}
export default authentication;

