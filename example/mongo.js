const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// print mongoose logs in dev env
if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

const db = mongoose.connection
const defaultConfig = {
    keepAlive: 1,
    useMongoClient: true,
}

db.on('error', (err) => {
    console.log('MongoDB connection error', err)
})

db.on('connected', () => {
    console.log('Mongoose connection successfully open')
})

db.on('disconnected', () => {
    console.log('MongoDB connection disconnected')
})

module.exports.connect = ({
                     username = '',
                     password = '',
                     host = 'mongo',
                     port = 27017,
                     database = 'hogwarts',
                     options: opts = {},
                 } = {}) => {
    const options = {
        ...defaultConfig,
        ...opts
    }
    const credentials = `${username && password && username + ':' + password + '@'}`
    const uri = process.env.MONGO_URI || `mongodb://${credentials}${host}:${port}/${database}`
    
    mongoose.connect(uri, options)
}
