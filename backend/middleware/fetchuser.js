const jwt = require('jsonwebtoken')

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    console.log("token is: " , token)
    if (!token) {
        res.status(401); json({ error: "Please authenticate using a valid token" })
    }
    try {
        const authtokendata = jwt.verify(token, process.env.SECRET)
        console.log('fetch user data of token', authtokendata.user)
        req.user = authtokendata.user
        next()
    } catch (error) {
        res.json({ error: "Error while authenticating token" })
    }
}

module.exports = fetchuser
