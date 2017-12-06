const {
    CONTENT_TYPE_ERROR,
} = require('../../utils/errors')

const defaultMimeTypes = ['application/json', 'application/x-www-form-urlencoded']

module.exports = (mimeTypes = defaultMimeTypes) => (req, res, next) => {
    const contentType = req.get('Content-Type')
    const isAllowed = contentType && mimeTypes.some(mimeType => contentType.includes(mimeType))
    
    if (!req.xhr && !isAllowed) {
        return next(CONTENT_TYPE_ERROR)
    }
    
    next()
}
