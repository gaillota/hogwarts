const MongooseGateway = require('./mongoose.gateway')

module.exports = ({ config }) => config.gateway || MongooseGateway
