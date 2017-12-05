const {
    CONTENT_TYPE_ERROR
} = require('../../utils/errors')

module.exports = (mimeTypes = []) => (req, res, next) => {
    const contentType = req.get('Content-Type')
    const allowedContentTypes = mimeTypes && mimeTypes.length ? mimeTypes : ['application/json', 'application/x-www-form-urlencoded']

    if (!req.xhr && (!contentType || !allowedContentTypes.includes(contentType))) {
        return next(CONTENT_TYPE_ERROR)
    }

    next()
}
