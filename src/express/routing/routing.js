const _forEach = require('lodash/forEach')

const modelRouting = require('./model.routing')

module.exports = ({ config, router }) => {
    const {
        models = {},
    } = config
    
    _forEach(models, (modelConfig) => {
        const modelRouter = modelRouting(modelConfig)
        
        router.use(modelRouter)
    })
}
