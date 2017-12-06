const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const routing = require('./routing/routing')
const {
    errorMiddleware,
    mimeGuardMiddleware,
    notFoundMiddleware,
    responseMiddleware,
} = require('./middlewares')

module.exports = (config) => {
    const {
        endpoint,
        mimeTypes,
        middlewares = [],
    } = config
    
    const app = express()
    const router = express.Router()
    
    routing({ config, router })
    
    app.use(logger('combined'))
    app.use(mimeGuardMiddleware(mimeTypes))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    if (middlewares.length) {
        app.use(middlewares)
    }
    app.use(endpoint, router)
    app.use(responseMiddleware)
    app.use(notFoundMiddleware)
    app.use(errorMiddleware)
    
    return app
}
