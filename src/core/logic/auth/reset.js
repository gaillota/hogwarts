async function resetPassword({
                                 request: {
                                     token,
                                     password,
                                     confirm,
                                 },
                                 data: {
                                     findUserWithToken,
                                     updatePassword,
                                     removeResetToken,
                                 },
                                 mixins: {
                                     hashPassword,
                                 },
                                 response: {
                                     respondWithMissingParameter,
                                     respondWithPasswordMismatch,
                                     respondWithUserNotFound,
                                     respondWithSuccess,
                                     respondWithError,
                                 },
                             }) {
    try {
        if (!token || !password || !confirm) {
            return respondWithMissingParameter(!token && 'token' || !password && 'password' || !confirm && 'confirm')
        }
        
        if (password !== confirm) {
            return respondWithPasswordMismatch()
        }
        
        const user = await findUserWithToken(token)
        
        if (!user) {
            return respondWithUserNotFound()
        }
        
        const hash = await hashPassword(password)
        await Promise.all([updatePassword(user, hash), removeResetToken(user)])
        
        respondWithSuccess()
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = resetPassword
