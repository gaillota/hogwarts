/* eslint-disable no-param-reassign */
module.exports = (err, req, res, next) => {
    console.error('An error occured:', err)
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
