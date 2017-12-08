module.exports = (manager, loginLabel) => {
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
                return manager.findOneByToken(token)
            },
            activateUser(user) {
                return manager.verifyUser(user)
            },
        },
    })
    
    const loginWithPassword = () => ({
        data: {
            getUserWithLogin(login) {
                return manager.findOneBy({ email: login })
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
    
    const loginWithToken = () => ({
        data: {
            getUserWithToken(id) {
                return manager.findOneById(id)
            },
        },
    })
    
    const reset = () => ({
        data: {
            findUserWithToken(token) {
                return manager.findOneBy({
                    resetToken: token,
                })
            },
            hashPassword(password) {
                return manager.hashPassword(password)
            },
            updatePasswordForUser(user, password) {
                return manager.replace(manager.getId(user), {
                    password,
                })
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
