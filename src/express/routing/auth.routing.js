const Gateway = require('../../database/gateways')
const UserManager = require('../../database/managers/user.manager')
const AuthController = require('../controllers/auth.controller')
const setPassport = require('../../passport/config')

module.exports = (appConfig, appRouter) => {
    const {
        secret,
        userSchema
    } = appConfig
    const gateway = new Gateway('users', userSchema)
    const manager = new UserManager(gateway)
    const controller = new AuthController(secret, manager)

    setPassport(secret, controller.loginWithToken)

    appRouter.post('/login', controller.loginWithPassword)
    appRouter.post('/register', controller.register)
    appRouter.post('/verify', controller.verify)
    appRouter.post('/forgot', controller.forgot)
    appRouter.post('/reset', controller.reset)
}
