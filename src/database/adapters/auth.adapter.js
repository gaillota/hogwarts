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
    
    const loginWithPassword = () => ({
        data: {
            getUserWithLogin(login) {
                return manager.findOneBy({ [loginLabel]: login })
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
    
    const forgot = () => ({
        data: {
            findUserWithLogin(login) {
                return manager.findOneBy({ [loginLabel]: login })
            },
            persistTokenForUser(user, token) {
                return manager.replace(manager.getId(user), {
                    resetToken: token,
                })
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
        loginWithPassword,
        loginWithToken,
        verify,
        forgot,
        reset,
    }
}
