const forgotPassword = require('./forgot')
const { authenticateUserWithPassword, authenticateUserWithToken } = require('./login')
const createUser = require('./register')
const resetPassword = require('./reset')
const verifyUser = require('./verify')

module.exports = {
    forgotPassword,
    authenticateUserWithPassword,
    authenticateUserWithToken,
    createUser,
    resetPassword,
    verifyUser,
}
