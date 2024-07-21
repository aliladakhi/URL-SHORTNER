const { getUserFromJwt } = require("../utilities/tokens");

function checkAuth(req, res, next) {
  if (!req.cookies || !req.cookies.sessionId) {
    req.user = null;
    return next();
  }
  const uid = req.cookies.sessionId;
  const user = getUserFromJwt(uid);
  req.user = user;
  return next();
}

function redirect(userTypes){
  return function(req,res,next){
    if(!req.user) return res.redirect("/user/Login")
    if(!userTypes.includes(req.user.userType)) return res.end("Not a valid user,Only admin can access")
    return next()
  }
}


module.exports = {checkAuth,redirect};
