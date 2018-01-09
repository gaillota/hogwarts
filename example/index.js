/* eslint-disable no-dupe-keys */
const mongoose = require('mongoose')

const hogwarts = require('../src/hogwarts')
const mongo = require('./mongo')

const { HTTP_METHODS, CRUD_METHODS } = hogwarts
const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

const config = {
    port,
    endpoint: '/api',
    mimeTypes: ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'],
    users: {
        roles: ['USER', 'ADMIN'], // Default
    },
    secret: 'DumbledoreIsDead',
    middlewares: [
        (req, res, next) => {
            console.log('First global middleware reached')
            next()
        },
        (req, res, next) => {
            console.log('Second global middleware reached')
            next()
        }
    ],
    gateway({ modelName, modelSchema }) {
        const schema = mongoose.Schema(modelSchema)
        const Model = mongoose.model(modelName, schema)
        
        const customMethod = id => Model.findOneById(id).exec()
        
        return {
            customMethod
        }
    },
    customRoutes: [
        {
            endpoint: '/custom',
            method: HTTP_METHODS.GET,
            anonymous: false, // Default
    
            roles: 'ADMIN',
    
            middlewares: [
                (req, res, next) => {
                    console.log('Middleware for global custom method')
                    next()
                },
            ],
            action: (req, res, next) => {
                console.log('Global custom method action')
                res.json({
                    data: 'Global custom action'
                })
            },
        }
    ]
}

const articlesConfig = {
    name: 'articles',
    endpoint: '/articles',
    schema: {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            maxlength: 500,
        },
        tags: {
            type: String,
            maxlength: 100
        }
    },
    timestamps: true,
    
    defaultCrud: false,
    
    restricted: true,
    
    // roles: ['ADMIN'],
    
    middlewares: [
        (req, res, next) => {
            console.log('Middleware for article model')
            next()
        },
    ],
    
    customRoutes: [
        {
            endpoint: '/custom',
            method: HTTP_METHODS.GET,
            restricted: false, // Default
        
            roles: 'USER',
        
            middlewares: [
                (req, res, next) => {
                    console.log('Middleware for /articles custom method')
                    next()
                },
            ],
            action: gateway => async (req, res, next) => {
                console.log('Article custom method action')
                const articlesId = req.params.id
                await gateway.customMethod(articlesId)
                res.json({
                    data: 'Custom action for article model'
                })
            },
        },
        {
            endpoint: '/:id',
            method: HTTP_METHODS.GET,
            restricted: false,
            roles: 'USER',
            middlewares: [
                (req, res, next) => {
                    console.log('Middleware for custom GET /:id')
                    next()
                }
            ],
            action: gateway => (req, res, next) => {
                res.json({
                    data: 'Custom crud method'
                })
            }
        },
    ],
}

const app = hogwarts()

app.configure(config)
app.registerModel(articlesConfig)

mongo.connect()

app.start().then(() => {
    console.info(`Server listening on port ${port} (${env})`)
})
