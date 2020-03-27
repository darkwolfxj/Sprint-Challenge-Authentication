const router = require('express').Router();
const db = require("../database/dbConfig")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const tokenGenerator = (user) => {
   const payload = {
       subject: user.id,
       username: user.username
   }
   const secret = "How many secrets can you eat?"
   const options = {
       expiresIn: "1hr"
   }
   return jwt.sign(payload, secret, options) 
}
router.post('/register', (req, res) => {
    // implement registration
    let { username, password } = req.body
    const newPass = bcrypt.hashSync(password, 12)
    password = newPass
    console.log(password)
    db("users")
        .insert({ username, password })
        .then(() => {
            res.status(201).json({ message: "Successfully created user account." })
        })
        .catch(({ name, message }) => res.status(500).json({ name, message }))
});

router.post('/login', (req, res) => {
    // implement login
    const { username, password } = req.body
    db("users")
        .where({ username })
            .then(([user]) => {
                if (user && bcrypt.compareSync(password, user.password)){
                    const token = tokenGenerator(user)
                    // req.session.user = {
                    //     user: user.username,
                    //     id: user.id
                    // }
                    res.status(200).json({ message: "Successfully logged in.", token})
                } else { res.status(401).json({ message: "Invalid Credentials." }) }
            })
            .catch(({ name, message, stack }) => res.status(500).json({ name, message, stack }))
});

module.exports = router;
