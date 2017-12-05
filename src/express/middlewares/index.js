/* eslint-disable global-require */
module.exports = {
    errorMiddleware: require('./error.middleware'),
    mimeGuardMiddleware: require('./mime-guard.middleware'),
    notFoundMiddleware: require('./not-found.middleware'),
    responseMiddleware: require('./response.middleware')
}
