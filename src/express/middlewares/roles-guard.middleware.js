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
            return next(new Error('Not authenticated'))
        }
        
        const { roles: userRoles } = user
        if (!userRoles || !userRoles.length || !hasRoles(roles, userRoles)) {
            return next(new Error('Access not granted'))
        }
        
        next()
    }
}
