const { UNAUTHORIZED } = require('../../utils/errors')

const hasAccess = (roles, checkRole) => roles.some(checkRole)

const checkRoleFor = user => (role) => {
    if (typeof role === 'string') {
        return user.roles.includes(role)
    }
    
    if (typeof role === 'function') {
        return role(user)
    }
    
    return false
}

// Check if user at least one of the roles required to pass through this middleware
module.exports = (roles) => {
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
        // Should never pass, but we never know
        if (!user) {
            return next(UNAUTHORIZED)
        }
        
        const checkRole = checkRoleFor(user)
        const { roles: userRoles } = user
        if (!userRoles || !userRoles.length || !hasAccess(roles, checkRole)) {
            return next(UNAUTHORIZED)
        }
        
        next()
    }
}
