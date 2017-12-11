const _forEach = require('lodash/forEach')
const _isArray = require('lodash/isArray')

const modelRouting = require('./model.routing')

module.exports = ({ config, router }) => {
    const {
        models = {},
        custom,
    } = config
    
    if (_isArray(custom)) {
        custom.forEach((customRoute) => {
            modelRouting.customRouting({
                route: customRoute,
                router,
            })
        })
    }
    
    _forEach(models, (model) => {
        modelRouting({ config: model, router })
    })
}
