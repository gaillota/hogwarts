const { NO_CONTENT } = require('http-status')
const {
    MISSING_PARAM_ERROR,
    MISMATCH_PASSWORD,
    NOT_FOUND_ERROR,
    WRONG_PASSWORD_ERROR,
    ACCESS_DENIED_ERROR,
    USER_NOT_FOUND,
} = require('../../utils/errors')

module.exports = () => {
    function register(req, res, next) {
        const {
            email, password, confirm,
        } = req.body
        
        return {
            request: {
                email,
                password,
                confirm,
            },
            response: {
                respondWithMismatchPassword() {
                    next(MISMATCH_PASSWORD)
                },
                respondWithMissingParameter(parameterName) {
                    next(MISSING_PARAM_ERROR(parameterName))
                },
                respondWithLoginAlreadyTaken() {
                    next(ACCESS_DENIED_ERROR(`This email is already taken`))
                },
                respondWithUserSuccessfullyCreated() {
                    res.status(NO_CONTENT).end()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    const loginWithPassword = (req, res, next) => {
        const { email, password } = req.body
        
        return {
            request: {
                email,
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
    
    const verify = (req, res, next) => {
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
    
    const forgot = (req, res, next) => {
        const { email } = req.body
        
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
    
    const reset = (req, res, next) => {
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
                    next(MISMATCH_PASSWORD)
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
        register,
        loginWithPassword,
        verify,
        forgot,
        reset,
    }
}
