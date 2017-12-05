const crypto = require('crypto')

const {
    authenticateUserWithPassword,
    authenticateUserWithToken,
    createUser,
    forgotPassword,
    resetPassword,
    verifyUser,
} = require('../../core/logic/auth')

const expressAdapter = require('../adapters/auth.adapter')
const databaseAdapter = require('../../database/adapters/auth.adapter')
const jwtAdapter = require('../../jwt/adapters/auth.adapter')

module.exports = class AuthController {
    constructor(loginLabel, secret, manager) {
        this.loginLabel = loginLabel
        this.manager = manager
        
        // Adapters
        this.expressAdapter = expressAdapter(loginLabel)
        this.databaseAdapter = databaseAdapter(manager, loginLabel)
        this.jwtAdapter = jwtAdapter(secret)
    }
    
    loginWithPassword(req, res, next) {
        const { request, response } = this.expressAdapter.loginWithPassword(req, res, next)
        const { data: { getUserWithLogin } } = this.databaseAdapter.loginWithPassword()
        const { generateToken } = this.jwtAdapter.loginWithPassword()
        
        authenticateUserWithPassword({
            request,
            response,
            data: {
                getUserWithLogin,
                generateToken,
            },
            mixins: {
                verifyPassword: (user, password) => this.manager.verifyPassword(user, password),
                isUserDisabled: user => user.disabled,
            },
        })
    }
    
    loginWithToken(req, res, next) {
        const { request, response } = this.jwtAdapter.loginWithToken(req, res, next)
        const { data } = this.databaseAdapter.loginWithPassword()
        
        authenticateUserWithToken({
            request,
            response,
            data,
            mixins: {
                isUserDisabled: user => user.disabled,
            },
        })
    }
    
    register(req, res, next) {
        const { request, response } = this.expressAdapter.register(req, res, next)
        const { data } = this.databaseAdapter.register()
        
        createUser({
            request,
            response,
            notifications: {
                sendVerificationToken(token) {
                    process.nextTick(() => {
                        console.log('newly created user, verification token:', token)
                    })
                },
            },
            data,
            mixins: {
                generateVerificationToken() {
                    return crypto.randomBytes(64).toString('hex')
                },
            },
        })
    }
    
    verify(req, res, next) {
        const { request, response } = this.expressAdapter.verify(req, res, next)
        const { data } = this.databaseAdapter.verify()
        
        verifyUser({
            request,
            response,
            data,
        })
    }
    
    forgot(req, res, next) {
        const { request, response } = this.expressAdapter.forgot(req, res, next)
        const { data } = this.databaseAdapter.forgot()
        
        forgotPassword({
            request,
            response,
            data,
            mixins: {
                generateToken() {
                    return crypto.randomBytes(64).toString('hex')
                },
            },
            notifications: {
                sendToken(token) {
                    process.nextTick(() => {
                        console.log('Send reset token via some channel:', token)
                    })
                },
            },
        })
    }
    
    reset(req, res, next) {
        const { request, response } = this.expressAdapter.reset(req, res, next)
        const { data } = this.databaseAdapter.reset()
        
        resetPassword({
            request,
            response,
            data,
        })
    }
}
