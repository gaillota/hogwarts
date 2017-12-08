async function forgotPassword({
                                  request: {
                                      login,
                                  },
                                  data: {
                                      findUserWithLogin,
                                      persistToken,
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
                                      respondWithError,
                                  },
                              }) {
    try {
        if (!login) {
            return respondWithMissingParameter('login')
        }
        
        const user = await findUserWithLogin(login)
        
        if (!user) {
            return respondWithUserNotFound()
        }
        
        // Await in case the token generation needs I/O operation someday
        const token = await generateToken()
        
        if (!token) {
            return respondWithTokenError()
        }
        
        await Promise.all([persistToken(user, token), sendToken(token)])
        respondWithSuccess()
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = forgotPassword
