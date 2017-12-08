const bcrypt = require('bcrypt')

const SHA256 = require('./sha256')

const ROUND = 10

function hashPassword(password) {
    return bcrypt.hash(password, ROUND)
}

function checkPassword(password, hash) {
    return bcrypt.compare(password, hash)
}

module.exports = {
    hashPassword,
    checkPassword
}
