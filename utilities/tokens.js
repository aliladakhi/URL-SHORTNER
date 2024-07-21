const jwt=require("jsonwebtoken")
require('dotenv').config();
const key=process.env.JWT_KEY


function setMap(user) {
  const payload={
...user
  }
  return jwt.sign(payload,key)
}

function getUserFromJwt(token) {
  if(!token){
    return null
  }
  return jwt.verify(token,key)._doc
}

module.exports = {
  setMap,
  getUserFromJwt,
};
