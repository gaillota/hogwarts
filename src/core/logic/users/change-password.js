const updatePassword = async ({
                                         request: {
                                             login,
                                             oldPassword,
                                             newPassword,
                                         },
                                         data: {
                                             findUserByLogin,
                                             updatePassword,
                                         },
                                         mixins: {
                                             verifyPassword,
                                         },
                                         response: {
                                             respondWithMissingParameter,
                                             respondWithUserNotFound,
                                             respondWithWrongPassword,
                                             respondWithError,
                                         },
                                     }) => {
    try {
        if (!login || !oldPassword || !newPassword) {
            return respondWithMissingParameter(!login && 'login' || !oldPassword && 'old password' || !newPassword && 'new password')
        }

        const user = await findUserByLogin(login)

        if (!user) {
            return respondWithUserNotFound()
        }

        if (!verifyPassword(user, oldPassword)) {
            return respondWithWrongPassword()
        }

        await updatePassword(user, newPassword)
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = updatePassword