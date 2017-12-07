const _forEach = require('lodash/forEach')

const setupAuth = require('./auth.routing')
const modelRouting = require('./model.routing')

module.exports = ({ config, router }) => {
    const {
        models = {},
    } = config
    
    // setupAuth(config, router)
    _forEach(models, (modelConfig) => {
        const modelRouter = modelRouting(modelConfig)
        
        router.use(modelRouter)
    })
}
