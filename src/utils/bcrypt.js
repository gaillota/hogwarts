const bcrypt = require('bcrypt')

const SHA256 = require('./sha256')

const ROUND = 10

function hashPassword(password) {
    return bcrypt.hash(SHA256(password), ROUND)
}

module.exports = {
    hashPassword,
}
