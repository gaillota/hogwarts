const bcrypt = require('bcrypt')

const SHA256 = require('./sha256')

const ROUND = 10

function hashPassword(password) {
    return bcrypt.hashSync(password, ROUND)
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    checkPassword
}
