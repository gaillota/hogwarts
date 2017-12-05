const forgotPassword = async ({
                                  request: {
                                      login,
                                  },
                                  data: {
                                      findUserWithLogin,
                                      persistTokenForUser,
                                  },
                                  mixins: {
                                      generateToken,
                                  },
                                  notifications: {
                                      sendToken,
                                  },
                                  response: {
                                      respondWithMissingParameter,
                                      respondWithUserNotFound,
                                      respondWithTokenError,
                                      respondWithSuccess,
                                  },
                              }) => {
    if (!login)
        return respondWithMissingParameter('login')

    const user = await findUserWithLogin(login)

    if (!user)
        return respondWithUserNotFound()
    
    // Await in case the token generation needs I/O operation someday
    const token = await generateToken()

    if (!token)
        return respondWithTokenError()

    await [persistTokenForUser(user, token), sendToken(token)]
    respondWithSuccess()
}

module.exports = forgotPassword
