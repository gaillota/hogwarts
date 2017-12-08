async function resetPassword({
                                 request: {
                                     token,
                                     password,
                                     confirmPassword,
                                 },
                                 data: {
                                     findUserWithToken,
                                     hashPassword,
                                     updatePasswordForUser,
                                 },
                                 response: {
                                     respondWithMissingParameter,
                                     respondWithPasswordMismatch,
                                     respondWithUserNotFound,
                                     respondWithResult,
                                     respondWithError,
                                 },
                             }) {
    try {
        if (!token || !password || !confirmPassword)
            return respondWithMissingParameter(!token && 'token' || !password && 'password' || !confirmPassword && 'confirmPassword')
        
        if (password !== confirmPassword)
            return respondWithPasswordMismatch()
        
        const user = await findUserWithToken(token)
        
        if (!user)
            return respondWithUserNotFound()
        
        const hash = await hashPassword(password)
        const result = await updatePasswordForUser(user, hash)
        
        respondWithResult(result)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = resetPassword
