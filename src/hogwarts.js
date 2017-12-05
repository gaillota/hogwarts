const http = require('http')

const start = require('./express/server')
const crudMethods = require('./config/crud-methods')

global.Promise = require('bluebird')

function shutdown(error) {
    if (error) {
        console.error('Shutting down with the error:', error)
    }
    
    // database.close()
    process.exit(1)
}

process.on('uncaughtException', (err) => {
    console.log('A synchronous error happened', err)
    
    shutdown(err)
})

process.on('unhandledRejection', (err) => {
    console.log('An asynchronous error happened', err)
    
    shutdown(err)
})

process.on('SIGINT', () => {
    console.log('App termination, shutting down...')
    shutdown()
})

module.exports = () => {
    const config = {}
    
    return {
        configure(options) {
            console.log('Configuring app with options:', options)
            config.options = options
        },
        registerModel(modelConfig) {
            console.log(`Registering model: ${modelConfig.name}`)
            config.models = {
                ...config.models,
                [modelConfig.name]: {
                    ...modelConfig
                },
            }
        },
        start() {
            if (!config.options) {
                throw new Error('You must configure your application before starting')
            }
            
            if (!config.models) {
                console.warn('Warning - You did not register any models')
            }
            
            return start({
                ...config.options,
                models: config.models
            })
        },
    }
}

module.exports.CRUD_METHODS = crudMethods
module.exports.HTTP_METHODS = http.METHODS.reduce((result, method) => ({
    ...result,
    [method]: method.toLowerCase(),
}), {})
