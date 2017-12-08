const crypto = require('crypto')

const {
    authenticateUserWithPassword,
    authenticateUserWithToken,
    createUser,
    forgotPassword,
    resetPassword,
    verifyUser,
} = require('../../core/logic/auth')

const getExpressAdapter = require('../adapters/auth.adapter')
const getDatabaseAdapter = require('../../database/adapters/auth.adapter')
const getJwtAdapter = require('../../jwt/adapters/auth.adapter')

const bcrypt = require('../../utils/bcrypt')

module.exports = ({ secret, manager }) => {
    // Adapters
    const expressAdapter = getExpressAdapter()
    const databaseAdapter = getDatabaseAdapter(manager)
    const jwtAdapter = getJwtAdapter(secret, manager)
    
    function register(req, res, next) {
        const { request, response } = expressAdapter.register(req, res, next)
        const { data } = databaseAdapter.register()
        
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
                hashPassword(password) {
                    return bcrypt.hashPassword(password)
                },
                generateVerificationToken() {
                    return crypto.randomBytes(64).toString('hex')
                },
            },
        })
    }
    
    function verify(req, res, next) {
        const { request, response } = expressAdapter.verify(req, res, next)
        const { data } = databaseAdapter.verify()
        
        verifyUser({
            request,
            response,
            mixins: {
                isUserVerified: user => user.verified,
            },
            data,
        })
    }
    
    function loginWithPassword(req, res, next) {
        const { request, response } = expressAdapter.loginWithPassword(req, res, next)
        const { data } = databaseAdapter.loginWithPassword()
        const { generateToken } = jwtAdapter.loginWithPassword()
        
        authenticateUserWithPassword({
            request,
            response,
            data: {
                ...data,
                generateToken,
            },
            // TODO: Move to dedicated mixins adapter
            mixins: {
                verifyPassword: (password, user) => manager.checkPassword(password, user),
                isUserDisabled: user => user.disabled,
                isUserNotVerified: user => !user.verified,
            },
        })
    }
    
    function loginWithToken(req, res, next) {
        const { request, response } = jwtAdapter.loginWithToken(req, res, next)
        const { data } = databaseAdapter.loginWithPassword()
        
        authenticateUserWithToken({
            request,
            response,
            data,
            mixins: {
                isUserDisabled: user => user.disabled,
            },
        })
    }
    
    function forgot(req, res, next) {
        const { request, response } = expressAdapter.forgot(req, res, next)
        const { data } = databaseAdapter.forgot()
        
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
    
    function reset(req, res, next) {
        const { request, response } = expressAdapter.reset(req, res, next)
        const { data } = databaseAdapter.reset()
        
        resetPassword({
            request,
            response,
            data,
        })
    }
    
    return {
        register,
        verify,
        loginWithPassword,
        loginWithToken,
        forgot,
        reset,
    }
}
