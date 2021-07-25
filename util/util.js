const { userAuthentication } = require("../server/models/user_authentication")

const wrapAsync = (fn) => {
    return function(req, res, next) {
        
        try {
            fn(req, res)
        } catch (error) {
            fn(next)
        }
    }
}

const authenticated = () => {
    return async function (req, res, next) {
        const { name, password} = req.headers;

        const userObj = {
            name: name,
            admin: await userAuthentication(name, password)
        }

        req.userInfo = userObj

        next()
        return
    }
}

        

module.exports = {
    wrapAsync,
    authenticated
}