const express = require('express')
const validate = require('express-validation')
const _isArray = require('lodash/isArray')

const { list } = require('../validations/crud.validation')
const authenticate = require('../../passport/authenticate')
const denyAnonymous = require('../middlewares/anonymous-guard.middleware')
const isGranted = require('../middlewares/roles-guard.middleware')
const CrudController = require('../controllers/crud.controller')

const crudRouting = ({ router, controller }) => {
    router.route('/')
        .get(validate(list), controller.list)
        .post(controller.create)
    
    router.route('/:id')
        .get(controller.one)
        .patch(controller.update)
        .put(controller.replace)
        .delete(controller.remove)
}

const customRouting = ({ route, router, gateway }) => {
    const {
        endpoint,
        method,
        disabled,
        anonymous,
        roles,
        action,
    } = route
    let { middlewares = [] } = route
    
    if (disabled) {
        return
    }
    
    if (typeof middlewares === 'function') {
        middlewares = [middlewares]
    }
    
    const routeMiddlewares = []
    
    if (!anonymous) {
        routeMiddlewares.push(authenticate())
        routeMiddlewares.push(denyAnonymous())
    }
    
    // TODO: Check roles
    if (roles) {
        routeMiddlewares.push(isGranted(roles))
    }
    
    if (_isArray(middlewares) && middlewares.length) {
        routeMiddlewares.push(...middlewares)
    }
    
    router.route(endpoint)[method.toLowerCase()](routeMiddlewares, action(gateway))
}

const modelRouting = ({ config, Gateway }) => {
    const router = express.Router()
    const {
        name,
        schema,
        timestamps,
        defaultCrud,
        roles,
        anonymous,
        customRoutes,
    } = config
    const modelMiddlewares = []
    let { middlewares = [] } = config
    
    // Gateway passed via config (or default)
    const gateway = Gateway({ modelName: name, schema, timestamps })
    // Controller used for crud middlewares
    const controller = CrudController(name, gateway)
    
    if (typeof middlewares === 'function') {
        middlewares = [middlewares]
    }
    
    if (!anonymous) {
        modelMiddlewares.push(authenticate())
        modelMiddlewares.push(denyAnonymous())
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
            customRouting({ route: customRoute, router, gateway })
        })
    }
    
    if (!defaultCrud) {
        crudRouting({ router, controller })
    }
    
    return router
}

module.exports = ({ config, router }) => {
    const { endpoint } = config
    console.log(`--- Configuring routing for ${endpoint} ---`)
    const modelRouter = modelRouting({ config })
    
    router.use(endpoint, modelRouter)
}

// Export custom routing for global custom routes
module.exports.customRouting = customRouting

// const routing = ({ config }) => {
//     const {
//         name,
//         endpoint,
//         schema,
//         timestamps,
//         defaultCrud,
//         restricted,
//         middlewares,
//         disabled,
//         roles,
//         method,
//         action,
//         customRoutes
//     } = config
//
//
// }
