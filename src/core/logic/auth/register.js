const createUser = async ({
                                     request: {
                                         login,
                                         password,
                                         confirm,
                                         profile = {},
                                     },
                                     data: {
                                         getUserByLogin,
                                         hashPassword,
                                         registerUser,
                                         persistVerificationTokenFor,
                                     },
                                     notifications: {
                                         sendVerificationToken,
                                     },
                                     mixins: {
                                         generateVerificationToken,
                                     },
                                     response: {
                                         respondWithMismatchPassword,
                                         respondWithMissingParameter,
                                         respondWithLoginAlreadyTaken,
                                         respondWithUserSuccessfullyCreated,
                                         respondWithError,
                                     },
                                 }) => {
    try {
        if (!login || !password || !confirm)
            return respondWithMissingParameter(!login && 'login' || !password && 'password' || !confirm && 'confirm password')

        if (password !== confirm)
            return respondWithMismatchPassword()

        const user = await getUserByLogin(login)
        if (user)
            return respondWithLoginAlreadyTaken()

        const hash = await hashPassword(password)
        const token = await generateVerificationToken()

        const newUser = await registerUser(login, hash, profile)
        console.log(newUser)
        await [persistVerificationTokenFor(newUser, token), sendVerificationToken(token)]

        respondWithUserSuccessfullyCreated()
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = createUser
