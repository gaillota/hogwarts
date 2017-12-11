async function authenticateUserWithPassword({
                                                request: {
                                                    login,
                                                    password,
                                                },
                                                data: {
                                                    getUserWithLogin,
                                                    generateToken,
                                                    updateLastConnectionAt,
                                                },
                                                mixins: {
                                                    verifyPassword,
                                                    isUserDisabled,
                                                    isUserNotVerified,
                                                },
                                                response: {
                                                    respondWithMissingParameter,
                                                    respondWithUserNotFound,
                                                    respondWithUserDisabled,
                                                    respondWithUserNotVerified,
                                                    respondWithWrongPassword,
                                                    respondWithUserAndToken,
                                                    respondWithError,
                                                },
                                            }) {
    try {
        if (!login || !password) {
            return respondWithMissingParameter(!login && 'login' || !password && 'password')
        }
        
        let user = await getUserWithLogin(login)
        if (!user) {
            return respondWithUserNotFound()
        }
        
        if (isUserDisabled(user)) {
            return respondWithUserDisabled()
        }
        
        if (isUserNotVerified(user)) {
            return respondWithUserNotVerified()
        }
        
        if (!verifyPassword(password, user)) {
            return respondWithWrongPassword()
        }
        
        const token = await generateToken(user)
        user = await updateLastConnectionAt(user)
        
        respondWithUserAndToken(user, token)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = authenticateUserWithPassword
