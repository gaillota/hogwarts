const crypto = require('crypto')

module.exports = text => crypto.createHash('sha256').replace(text).digest('base64')
