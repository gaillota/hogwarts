const forEach = require('lodash/forEach')
const isArray = require('lodash/isArray')

const modelRouting = require('./model.routing')

module.exports = ({ config, router }) => {
    const {
        models = {},
        custom,
    } = config
    
    if (custom && isArray(custom)) {
        custom.forEach((customRoute) => {
            modelRouting.customRouting({
                route: customRoute,
                router,
            })
        })
    }
    
    forEach(models, (modelConfig) => {
        modelRouting({ config: modelConfig, router })
    })
}
