const {
    NOT_FOUND_ERROR
} = require('../../utils/errors')

module.exports = (req, res, next) => {
    // If we reach this middleware, it means no routes has matched the incoming request
    next(NOT_FOUND_ERROR)
}
