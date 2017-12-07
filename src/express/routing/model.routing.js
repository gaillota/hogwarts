const express = require('express')
const validate = require('express-validation')
const _isArray = require('lodash/isArray')

const { list } = require('../validations/crud.validation')
const authenticate = require('../middlewares/authenticate.middleware')
const isGranted = require('../middlewares/roles-guard.middleware')
const crudController = require('../controllers/crud.controller')
const { MongoGateway } = require('../../database/gateways')

const crudRouting = ({ config, router }) => {
    const {
        name,
        schema,
        timestamps,
    } = config
    // Gateway passed via config (or default)
    const gateway = MongoGateway({ modelName: name, schema, timestamps })
    // Controller used for crud middlewares
    const controller = crudController(name, gateway)
    
    router.route('/')
        .get(validate(list), controller.list)
        .post(controller.create)

    router.route('/:id')
        .get(controller.one)
        .patch(controller.update)
        .put(controller.replace)
        .delete(controller.remove)
}

const customRouting = (route, router) => {
    const {
        endpoint,
        method,
        anonymous,
        disabled,
        roles,
        middlewares = [],
        action,
    } = route
    
    if (disabled) {
        return
    }
    
    const routeMiddlewares = []
    
    if (!anonymous) {
        routeMiddlewares.push(authenticate)
    }
    
    if (roles) {
        routeMiddlewares.push(isGranted(roles))
    }
    
    if (_isArray(middlewares) && middlewares.length) {
        routeMiddlewares.push(...middlewares)
    }
    
    router.route(endpoint)[method.toLowerCase()](routeMiddlewares, action)
}

const modelRouting = ({ config }) => {
    const router = express.Router()
    const {
        disabled,
        anonymous,
        custom = [],
    } = config
    let { middlewares = [] } = config
    
    if (typeof middlewares === 'function') {
        middlewares = [middlewares]
    }
    
    if (!anonymous) {
        router.use(authenticate)
    }
    
    if (_isArray(middlewares) && middlewares.length) {
        router.use(middlewares)
    }
    
    // Define custom routes before default crud
    custom.forEach((route) => {
        customRouting(route, router)
    })
    
    if (!disabled) {
        crudRouting({ config, router })
    }
    
    return router
}

module.exports = ({ endpoint, ...config }) => {
    const router = express.Router()
    const modelRouter = modelRouting({ config })
    
    router.use(endpoint, modelRouter)
    
    return router
}
