const passport = require('passport')
const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

module.exports = (secretOrKey, authMiddleware) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey,
    }

    passport.use('jwt-auth', new JwtStrategy(jwtOptions, authMiddleware))
}
