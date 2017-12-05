const jwt = require('jsonwebtoken')
const {
    ACCESS_DENIED_ERROR,
    MISSING_PARAM_ERROR
} = require('../../utils/errors')

module.exports = (secret) => {
    const loginWithPasswordAdapter = () => ({
        generateToken(user) {
            const payload = {id: user._id}
            return jwt.sign(payload, secret)
        },
    })

    const loginWithTokenAdapter = ({sub: id}, done) => ({
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
        loginWithPassword: loginWithPasswordAdapter,
        loginWithToken: loginWithTokenAdapter,
    }
}
