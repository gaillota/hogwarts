const verifyUser = async ({
                                     request: {
                                         token,
                                     },
                                     data: {
                                         findUserWithToken,
                                         activateUser,
                                     },
                                     response: {
                                         respondWithEmptyToken,
                                         responseWithUserNotFound,
                                         respondWithResult,
                                         respondWithError,
                                     },
                                 }) => {
    try {
        if (!token)
            return respondWithEmptyToken()

        const user = await findUserWithToken(token)
        if (!user)
            return responseWithUserNotFound()

        const result = await activateUser(user)
        respondWithResult(result)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = verifyUser
