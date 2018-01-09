const joi = require('joi')

const articlesConfig = {
    name: 'articles',
    endpoint: '/articles',
    schema: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    // crud: {
    //     [CRUD_METHODS.PAGINATE]: {
    //         anonymous: true,
    //         roles: 'ADMIN',
    //         middlewares: [],
    //         action: (req, res, next) => {
    //             console.log('Custom crud action: paginate')
    //             next()
    //         }
    //     },
    //     [CRUD_METHODS.REMOVE]: {
    //         disabled: true,
    //     },
    // },
    disabled: true,
    
    restricted: true,
    
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
            restricted: false, // Default
            
            roles: 'String || Function|| Array',
            
            middlewares: [
                (req, res, next) => {
                    console.log('Middleware for custom article method')
                    next()
                },
            ],
            action: (req, res, next) => {
                console.log('Article custom method action')
                next()
            },
        },
    ],
}

const schema = {
    name: joi.string().required(),
    endpoint: joi.string().required(),
    schema: joi.object().required(),
    disabled: joi.boolean(),
    anonymous: joi.boolean(),
    roles: joi.string(),
    middlewares: joi.array().items(joi.func().arity(3)),
    custom: joi.array().items(joi.object())
}
