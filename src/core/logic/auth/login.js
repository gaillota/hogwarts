const authenticateUserWithPassword = async ({
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
                                                       },
                                                       response: {
                                                           respondWithMissingParameter,
                                                           respondWithUserNotFound,
                                                           respondWithUserDisabled,
                                                           respondWithWrongPassword,
                                                           respondWithUserToken,
                                                           respondWithError,
                                                       },
                                                   }) => {
    try {
        if (!login || !password)
            return respondWithMissingParameter(!login && 'login' || !password && 'password')

        const user = await getUserWithLogin(login)
        if (!user)
            return respondWithUserNotFound()

        if (isUserDisabled(user))
            return respondWithUserDisabled()

        if (!verifyPassword(user, password))
            return respondWithWrongPassword()

        const token = await generateToken(user)
        respondWithUserToken(token)
    } catch (err) {
        respondWithError(err)
    }
}

const authenticateUserWithToken = async ({
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
                                                }) => {
    try {
        if (!token)
            return respondWithTokenMissing()

        const user = await getUserWithToken(token)

        if (!user)
            return responseWithUserNotFound()

        if (isUserDisabled(user))
            return respondWithUserDisabled()

        respondWithAuthenticatedUser(user)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = {
  authenticateUserWithPassword,
  authenticateUserWithToken
}
