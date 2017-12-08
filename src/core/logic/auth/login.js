async function authenticateUserWithPassword({
                                                request: {
                                                    login,
                                                    password,
                                                },
                                                data: {
                                                    getUserWithLogin,
                                                    generateToken,
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
                                                    respondWithUserToken,
                                                    respondWithError,
                                                },
                                            }) {
    try {
        if (!login || !password) {
            return respondWithMissingParameter(!login && 'login' || !password && 'password')
        }
        
        const user = await getUserWithLogin(login)
        if (!user) {
            return respondWithUserNotFound()
        }
        
        if (isUserDisabled(user)) {
            return respondWithUserDisabled()
        }
        
        // if (isUserNotVerified(user)) {
        //     return respondWithUserNotVerified()
        // }
        
        if (!verifyPassword(password, user)) {
            return respondWithWrongPassword()
        }
        
        const token = await generateToken(user)
        respondWithUserToken(token)
    } catch (err) {
        respondWithError(err)
    }
}

async function authenticateUserWithToken({
                                             request: {
                                                 token,
                                             },
                                             data: {
                                                 getUserWithToken,
                                             },
                                             mixins: {
                                                 isUserDisabled,
                                             },
                                             response: {
                                                 respondWithTokenMissing,
                                                 responseWithUserNotFound,
                                                 respondWithUserDisabled,
                                                 respondWithAuthenticatedUser,
                                                 respondWithError,
                                             },
                                         }) {
    try {
        if (!token) {
            return respondWithTokenMissing()
        }
        
        const user = await getUserWithToken(token)
        
        if (!user) {
            return responseWithUserNotFound()
        }
        
        if (isUserDisabled(user)) {
            return respondWithUserDisabled()
        }
        
        respondWithAuthenticatedUser(user)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = {
    authenticateUserWithPassword,
    authenticateUserWithToken,
}
