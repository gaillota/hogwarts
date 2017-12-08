const verifyUser = async ({
                              request: {
                                  token,
                              },
                              data: {
                                  findUserWithToken,
                                  activateUser,
                              },
                              mixins: {
                                  isUserVerified,
                              },
                              response: {
                                  respondWithEmptyToken,
                                  responseWithUserNotFound,
                                  respondWithUserAlreadyVerified,
                                  respondWithResult,
                                  respondWithError,
                              },
                          }) => {
    try {
        if (!token) {
            return respondWithEmptyToken()
        }
        
        const user = await findUserWithToken(token)
        if (!user) {
            return responseWithUserNotFound()
        }
        
        if (isUserVerified(user)) {
            return respondWithUserAlreadyVerified()
        }
        
        const result = await activateUser(user)
        respondWithResult(result)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = verifyUser
