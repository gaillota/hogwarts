const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const helmet = require('helmet')
const passport = require('passport')

const authRouting = require('./routing/auth.routing')
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
    const authRouter = express.Router()
    const apiRouter = express.Router()
    
    authRouting({ config, router: authRouter })
    routing({ config, router: apiRouter })
    
    // Request logging, dev: console | production: file
    app.use(logger('combined'))
    
    // MimeType checking
    app.use(mimeGuardMiddleware(mimeTypes))
    
    // Attach body param to req.body
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    
    // gzip compress
    app.use(compress())
    
    // Enable PUT or DELETE verbs
    app.use(methodOverride())
    
    // Add HTTP headers
    app.use(helmet())
    
    // Enable CORS (Cross Origin Resource Sharing)
    app.use(cors())
    
    // enable passport authentication
    app.use(passport.initialize())
    
    if (middlewares.length) {
        app.use(middlewares)
    }
    app.use(authRouter)
    app.use(endpoint, apiRouter)
    app.use(responseMiddleware)
    app.use(notFoundMiddleware)
    app.use(errorMiddleware)
    
    return app
}
