/* eslint-disable no-dupe-keys */
const hogwarts = require('../src/hogwarts')
const mongoose = require('./mongo')

const { HTTP_METHODS, CRUD_METHODS } = hogwarts
const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

const appConfig = {
    port,
    endpoint: '/api',
    mimeTypes: ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'],
    roles: ['ADMIN', 'SUPER_ADMIN'], // Default
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
    crud: {
        [CRUD_METHODS.PAGINATE]: {
            anonymous: true,
            roles: 'ADMIN',
            middlewares: [],
            action: (req, res, next) => {
                console.log('Custom crud action: paginate')
                next()
            }
        },
        [CRUD_METHODS.REMOVE]: {
            disabled: true,
        },
    },
    
    disabled: true,
    
    anonymous: true,
    
    roles: 'String || Function|| Array',
    
    middlewares: [
        (req, res, next) => {
            console.log('Middleware for article model')
            next()
        },
    ],
    
    custom: [
        {
            endpoint: '/custom',
            method: HTTP_METHODS.GET,
            anonymous: true, // Default
            
            // roles: 'String || Function|| Array',
            
            middlewares: [
                (req, res, next) => {
                    console.log('Middleware for custom article method')
                    next()
                },
            ],
            action: (req, res, next) => {
                console.log('Article custom method action')
                res.json({
                    data: 'Custom action for article model'
                })
            },
        },
    ],
}

const app = hogwarts()

app.configure(appConfig)
app.registerModel(articlesConfig)

mongoose.connect()

app.start().then(() => {
    console.info(`Server listening on port ${port} (${env})`)
})
