const _forEach = require('lodash/forEach')

const authRouting = require('./auth.routing')
const modelRouting = require('./model.routing')

module.exports = ({ config, router }) => {
    const {
        models = {},
    } = config
    
    // authRouting(appConfig, appRouter)
    _forEach(models, ({ endpoint, ...modelConfig }) => {
        const modelRouter = modelRouting({ config: modelConfig })
        router.use(endpoint, modelRouter)
    })
}
