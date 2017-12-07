const { ANONYMOUS_ERROR } = require('../../utils/errors')

module.exports = (req, res, next) => {
    if (!req.user) {
        return next(ANONYMOUS_ERROR)
    }
    
    next()
}
