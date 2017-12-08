const jwt = require('jsonwebtoken')

const {
    ACCESS_DENIED_ERROR,
    MISSING_PARAM_ERROR,
} = require('../../utils/errors')

module.exports = (secret, manager) => {
    const loginWithPassword = () => ({
        generateToken(user) {
            const payload = {
                sub: manager.getId(user)
            }
            const options = {
                expiresIn: '24h'
            }
            
            return jwt.sign(payload, secret, options)
        },
    })
    
    const loginWithToken = ({ sub: id }, done) => ({
        request: {
            token: id,
        },
        response: {
            respondWithTokenMissing() {
                return done(MISSING_PARAM_ERROR('token'))
            },
            responseWithUserNotFound() {
                return done(ACCESS_DENIED_ERROR('User not found'))
            },
            respondWithUserDisabled() {
                return done(ACCESS_DENIED_ERROR('User has been disabled'))
            },
            respondWithAuthenticatedUser(user) {
                done(null, user)
            },
            respondWithError(err) {
                done(err)
            },
        },
    })
    
    return {
        loginWithPassword,
        loginWithToken,
    }
}
