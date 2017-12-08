const { MongoGateway } = require('../../database/gateways')
const UserManager = require('../../database/managers/user.manager')
const authController = require('../controllers/auth.controller')
const getUserSchema = require('../models/user.model')
const setPassport = require('../../passport/config')

module.exports = ({ config, router }) => {
    const { secret, users } = config
    const {
        roles = ['USER', 'ADMIN'],
        defaultRole = 'USER',
        schema = {}
    } = users
    
    const userSchema = getUserSchema({ roles, defaultRole, userSchema: schema })
    const gateway = MongoGateway({ modelName: 'users', schema: userSchema })
    const manager = UserManager({ gateway })
    const controller = authController({ secret, manager })
    
    // setPassport(secret, controller.loginWithToken)
    
    router.post('/register', controller.register)
    router.get('/verify/:token', controller.verify)
    router.post('/verify', controller.verify)
    router.post('/login', controller.loginWithPassword)
    // router.post('/forgot', controller.forgot)
    // router.post('/reset', controller.reset)
}
