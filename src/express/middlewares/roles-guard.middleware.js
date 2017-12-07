const { ANONYMOUS_ERROR } = require('../../utils/errors')

const hasRoles = (roles, userRoles) => roles.every(role => userRoles.includes(role))

module.exports = (roles = []) => {
    if (typeof roles === 'string') {
        // eslint-disable-next-line no-param-reassign
        roles = [roles]
    }
    
    return (req, res, next) => {
        // If no role is required, everyone has access
        if (!roles.length) {
            return next()
        }
        
        const { user } = req
        if (!user) {
            return next(ANONYMOUS_ERROR)
        }
        
        const { roles: userRoles } = user
        if (!userRoles || !userRoles.length || !hasRoles(roles, userRoles)) {
            return next(new Error('Access not granted'))
        }
        
        next()
    }
}
