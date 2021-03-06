/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")
const jwtSecret = require("../secrets")

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers
    if (authorization){
        jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
        err ? res.status(401).json({ you: 'shall not pass!' }) : req.decodedToken = decodedToken && next() 
    })} else res.status(400).json({ message: "No credentials provided" })
};

module.exports = authMiddleware