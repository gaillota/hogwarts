const { ACCESS_DENIED_ERROR } = require('../../utils/errors')

module.exports = (req, res, next) => {
    if (!req.user) {
        return next(ACCESS_DENIED_ERROR('This resource needs authentication'))
    }
    
    next()
}
