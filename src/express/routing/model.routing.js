const express = require('express')
const validate = require('express-validation')
const _isArray = require('lodash/isArray')

const { list } = require('../validations/crud.validation')
const authenticate = require('../../passport/authenticate')
const preventAnonymous = require('../middlewares/anonymous-guard.middleware')
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

const customRouting = ({ route, router }) => {
    const {
        endpoint,
        method,
        disabled,
        roles,
        action,
    } = route
    let { anonymous, middlewares = [] } = route
    
    if (disabled) {
        return
    }
    
    if (typeof middlewares === 'function') {
        middlewares = [middlewares]
    }
    
    if (roles && roles.length) {
        anonymous = false
    }
    
    const routeMiddlewares = []
    
    if (!anonymous) {
        routeMiddlewares.push(authenticate())
        routeMiddlewares.push(preventAnonymous())
    }
    
    // TODO: Check roles
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
        roles,
        custom: customRoutes,
    } = config
    const modelMiddlewares = []
    let { anonymous, middlewares = [] } = config
    
    if (typeof middlewares === 'function') {
        middlewares = [middlewares]
    }
    
    if (roles && roles.length) {
        anonymous = false
    }
    
    if (!anonymous) {
        modelMiddlewares.push(authenticate())
        modelMiddlewares.push(preventAnonymous())
    }
    
    // TODO: Check roles
    if (roles) {
        modelMiddlewares.push(isGranted(roles))
    }
    
    if (_isArray(middlewares) && middlewares.length) {
        modelMiddlewares.push(middlewares)
    }
    
    if (modelMiddlewares.length) {
        router.use(modelMiddlewares)
    }
    
    if (customRoutes && _isArray(customRoutes)) {
        // Define custom routes before default crud
        customRoutes.forEach((customRoute) => {
            customRouting({ route: customRoute, router })
        })
    }
    
    if (!disabled) {
        crudRouting({ config, router })
    }
    
    return router
}

module.exports = ({ config, router }) => {
    const { endpoint } = config
    console.log(`--- Configuring routing for ${endpoint} ---`)
    const modelRouter = modelRouting({ config })
    
    router.use(endpoint, modelRouter)
}

module.exports.customRouting = customRouting
