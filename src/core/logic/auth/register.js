/* eslint-disable no-mixed-operators */
const createUser = async ({
                              request: {
                                  email,
                                  password,
                                  confirm,
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
        if (!email || !password || !confirm) {
            return respondWithMissingParameter(!email && 'email' || !password && 'password' || !confirm && 'confirm password')
        }
        
        if (password !== confirm) {
            return respondWithMismatchPassword()
        }
        
        const user = await getUserByLogin(email)
        if (user) {
            return respondWithLoginAlreadyTaken()
        }
        
        const hash = await hashPassword(password)
        const token = await generateVerificationToken()
        
        const newUser = await registerUser(email, hash)
        await Promise.all([
            persistVerificationTokenFor(newUser, token),
            sendVerificationToken(token)
        ])
        
        respondWithUserSuccessfullyCreated()
    } catch (err) {
        respondWithError(err)
    }
}

module.exports = createUser
