async function verifyUser({
                              request: {
                                  token,
                              },
                              data: {
                                  findUserWithToken,
                                  activateUser,
                                  removeVerificationToken,
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
                          }) {
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
        await removeVerificationToken(user)
        respondWithResult(result)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = verifyUser
