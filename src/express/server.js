const http = require('http')

const initApp = require('./app')

module.exports = config => new Promise((resolve, reject) => {
    const { port } = config
    const env = process.env.NODE_ENV || config.env || 'development'
    
    const app = initApp(config)
    
    /**
     * Create http server
     */
    console.log('---- Initializing server ----')
    http.createServer(app).listen(port, (err) => {
        if (err) {
            return reject(err)
        }
        
        resolve()
    })
})
