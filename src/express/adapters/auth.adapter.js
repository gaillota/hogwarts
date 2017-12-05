const {
    MISSING_PARAM_ERROR,
    MISMATCH_PASSWORD,
    NOT_FOUND_ERROR,
    WRONG_PASSWORD_ERROR,
    ACCESS_DENIED_ERROR,
    USER_NOT_FOUND,
} = require('../../utils/errors')

module.exports = (loginLabel = 'email') => {
    const loginWithPasswordAdapter = (req, res, next) => {
        const { [loginLabel]: login, password } = req.body
        
        return {
            request: {
                login,
                password,
            },
            response: {
                respondWithMissingParameter(parameterName) {
                    next(MISSING_PARAM_ERROR(parameterName))
                },
                respondWithUserDisabled() {
                    next(ACCESS_DENIED_ERROR('User has been disabled'))
                },
                respondWithUserNotFound() {
                    next(NOT_FOUND_ERROR)
                },
                respondWithWrongPassword() {
                    next(WRONG_PASSWORD_ERROR)
                },
                respondWithUserToken(token) {
                    req.response = {
                        token,
                    }
                    next()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    const registerAdapter = (req, res, next) => {
        const {
            [loginLabel]: login, password, confirm, profile,
        } = req.body
        
        return {
            request: {
                login,
                password,
                confirm,
                profile,
            },
            response: {
                respondWithMismatchPassword() {
                    next(MISMATCH_PASSWORD)
                },
                respondWithMissingParameter(parameterName) {
                    next(MISSING_PARAM_ERROR(parameterName))
                },
                respondWithLoginAlreadyTaken() {
                    next(ACCESS_DENIED_ERROR(`This ${loginLabel} is already taken`))
                },
                respondWithUserSuccessfullyCreated() {
                    req.response = {
                        status: 204,
                    }
                    next()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    const verifyAdapter = (req, res, next) => {
        const { token } = req.body
        
        return {
            request: {
                token,
            },
            response: {
                respondWithEmptyToken() {
                    next(MISSING_PARAM_ERROR('token'))
                },
                responseWithUserNotFound() {
                    next(USER_NOT_FOUND)
                },
                respondWithResult(result) {
                    req.response = {
                        result,
                    }
                    next()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    const forgotAdapter = (req, res, next) => {
        const { [loginLabel]: login } = req.body
        
        return {
            request: {
                login,
            },
            response: {
                respondWithMissingParameter(parameterName) {
                    next(MISSING_PARAM_ERROR(parameterName))
                },
                responseWithUserNotFound() {
                    next(USER_NOT_FOUND)
                },
                respondWithSuccess() {
                    next()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    const resetAdapter = (req, res, next) => {
        const { token, password, confirmPassword } = req.body
        
        return {
            request: {
                token,
                password,
                confirmPassword,
            },
            response: {
                respondWithMissingParameter(parameterName) {
                    next(MISSING_PARAM_ERROR(parameterName))
                },
                respondWithPasswordMismatch() {
                    next(PASSWORD_MISMATCH)
                },
                respondWithUserNotFound() {
                    next(NOT_FOUND_ERROR)
                },
                respondWithResult(result) {
                    req.response = {
                        result,
                    }
                    next()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    return {
        loginWithPassword: loginWithPasswordAdapter,
        register: registerAdapter,
        verify: verifyAdapter,
        forgot: forgotAdapter,
        reset: resetAdapter,
    }
}
