const _forEach = require('lodash/forEach')
const _isArray = require('lodash/isArray')

const modelRouting = require('./model.routing')
const GatewayProvider = require('../../database/gateways')

module.exports = ({ config, router }) => {
    const {
        models = {},
        customRoutes,
    } = config
    const Gateway = GatewayProvider({ config })
    
    if (_isArray(customRoutes)) {
        customRoutes.forEach((customRoute) => {
            modelRouting.customRouting({
                route: customRoute,
                router,
            })
        })
    }
    
    _forEach(models, (model) => {
        modelRouting({ config: model, router, Gateway })
    })
}
