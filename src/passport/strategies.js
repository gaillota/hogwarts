const passportJwt = require('passport-jwt')

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt

const jwt = ({ manager }) => async (payload, done) => {
    try {
        const { sub: id } = payload
        const user = await manager.findById(id)
        
        if (!user) {
            return done(null, false)
        }
        
        done(null, user)
    } catch (err) {
        done(err, false)
    }
}

module.exports = ({ secret, manager }) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: secret,
    }
    
    return {
        jwt: new JwtStrategy(jwtOptions, jwt({ manager }))
    }
}
