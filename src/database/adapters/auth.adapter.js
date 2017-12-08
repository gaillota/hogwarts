module.exports = (manager) => {
    const register = () => ({
        data: {
            getUserByLogin(email) {
                return manager.findOneBy({ email })
            },
            registerUser(email, hash) {
                return manager.createUser(email, hash)
            },
            persistVerificationTokenFor(user, token) {
                return manager.persistVerificationTokenForUser(user, token)
            },
        },
    })
    
    const verify = () => ({
        data: {
            findUserWithToken(token) {
                return manager.findOneByVerificationToken(token)
            },
            activateUser(user) {
                return manager.verifyUser(user)
            },
            removeVerificationToken(user) {
                return manager.removeVerificationToken(user)
            },
        },
    })
    
    const loginWithPassword = () => ({
        data: {
            getUserWithLogin(login) {
                return manager.findOneBy({ email: login })
            },
            updateLastConnectionAt(user) {
                return manager.updateLastConnectionAt(user)
            },
        },
    })
    
    const forgot = () => ({
        data: {
            findUserWithLogin(login) {
                return manager.findOneBy({ email: login })
            },
            persistToken(user, token) {
                return manager.persistToken(user, token)
            },
        },
    })
    
    const reset = () => ({
        data: {
            findUserWithToken(token) {
                return manager.findOneByResetToken(token)
            },
            updatePassword(user, password) {
                return manager.updatePassword(user, password)
            },
            removeResetToken(user) {
                return manager.removeResetToken(user)
            },
        },
    })
    
    const loginWithToken = () => ({
        data: {
            getUserWithToken(id) {
                return manager.findOneById(id)
            },
        },
    })
    
    return {
        register,
        verify,
        loginWithPassword,
        loginWithToken,
        forgot,
        reset,
    }
}
