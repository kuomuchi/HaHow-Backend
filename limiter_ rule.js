const rateLimit = require("express-rate-limit") // limite

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 120, // limit each IP to 120 requests per windowMs
})

module.exports = {
    apiLimiter
}