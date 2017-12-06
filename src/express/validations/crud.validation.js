const Joi = require('joi')

module.exports = {
    list: {
        query: {
            page: Joi.number().min(1),
            count: Joi.number().min(1).max(100),
            offset: Joi.number().min(0),
            query: Joi.object()
        }
    }
}
