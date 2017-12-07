/* eslint-disable no-param-reassign,no-unused-vars */
module.exports = (err, req, res, next) => {
    if (typeof err === 'string') {
        err = {
            message: err
        }
    }
    
    const {status = 500, message = 'An error occurred', stack} = err

    res.status(status).json({
        status,
        message,
        reason: process.env.NODE_ENV === 'development' && stack
    })
}
