const jwt = require("jsonwebtoken");
const authentication = (auth) => {
  if (localStorage.getItem("lmsToken")) {
    auth = jwt.verify(localStorage.getItem("lmsToken"), "lmsPlatform");
    return auth;
  }
  return {};
};
export default authentication;
