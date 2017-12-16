const MongoGateway = require('./mongo.gateway')

module.exports = ({ config }) => config.gateway || MongoGateway
