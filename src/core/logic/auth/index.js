const forgotPassword = require('./forgot')
const authenticateUserWithPassword = require('./login')
const createUser = require('./register')
const resetPassword = require('./reset')
const verifyUser = require('./verify')

module.exports = {
    forgotPassword,
    authenticateUserWithPassword,
    createUser,
    resetPassword,
    verifyUser,
}
