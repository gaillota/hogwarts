const joi = require('joi')

const schema = {
    port: joi.number(),
    endpoint: joi.string(),
    mimeTypes: joi.array().items(joi.string().required()),
    roles: joi.string(),
    secret: joi.string().require(),
    middlewares: joi.array().items(joi.func().arity(3))
}

module.exports = schema
