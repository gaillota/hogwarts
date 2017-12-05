const forgotPassword = require('./forgot')
const {
    authenticateUserWithPassword,
    authenticateUserWithToken,
} = require('./login')
const register = require('./register')
const resetPassword = require('./reset')
const verifyPassword = require('./verify')

module.exports = {
    forgotPassword,
    authenticateUserWithPassword,
    authenticateUserWithToken,
    register,
    resetPassword,
    verifyPassword,
}
