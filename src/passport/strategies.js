const passportJwt = require('passport-jwt')

const { ExtractJwt, Strategy: JwtStrategy } = passportJwt

const jwt = ({ manager }) => async (payload, done) => {
    console.log('--- JWT payload ---', payload)
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
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: secret,
    }
    
    return {
        jwt: new JwtStrategy(options, jwt({ manager })),
    }
}
