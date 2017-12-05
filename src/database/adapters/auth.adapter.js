module.exports = (manager, loginLabel) => {
    const loginWithPassword = () => ({
        data: {
            getUserWithLogin(login) {
                return manager.findOneBy({[loginLabel]: login})
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

    const register = () => ({
        data: {
            getUserByLogin(login) {
                return manager.findOneBy({[loginLabel]: login})
            },
            hashPassword(password) {
                return manager.hashPassword(password)
            },
            registerUser(login, hash, profile) {
                const newUser = {
                    [loginLabel]: login,
                    password: hash,
                    profile,
                    createdAt: new Date(),
                }

                return manager.createUser(newUser)
            },
            persistVerificationTokenFor(user, token) {
                // TODO: Does not work
                const verifyToken = {
                    token,
                    when: new Date(),
                }

                return manager.persistVerificationTokenForUser(user, verifyToken)
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
                return manager.findOneBy({[loginLabel]: login})
            },
            persistTokenForUser(user, token) {
                return manager.update(manager.getId(user), {
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
                return manager.update(manager.getId(user), {
                    password,
                })
            },
        },
    })

    return {
        loginWithPassword,
        loginWithToken,
        register,
        verify,
        forgot,
        reset,
    }
}
