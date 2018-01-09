const { CREATED, NO_CONTENT } = require('http-status')
const {
    MISSING_PARAM_ERROR,
    MISMATCH_PASSWORD,
    WRONG_PASSWORD_ERROR,
    ACCESS_DENIED_ERROR,
    USER_NOT_FOUND,
    USER_NOT_VERIFIED,
    USER_ALREADY_VERIFIED,
    TOKEN_GENERATION_ERROR,
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
                    res.status(CREATED).end()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    function verify(req, res, next) {
        return {
            request: {
                token: req.params.token || req.body.token,
            },
            response: {
                respondWithEmptyToken() {
                    next(MISSING_PARAM_ERROR('token'))
                },
                responseWithUserNotFound() {
                    next(USER_NOT_FOUND)
                },
                respondWithUserAlreadyVerified() {
                    next(USER_ALREADY_VERIFIED)
                },
                respondWithResult(result) {
                    res.json({
                        data: result,
                    })
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    const loginWithPassword = (req, res, next) => {
        const { email, password } = req.body
        const parameterLabels = {
            login: 'email',
            password: 'password',
        }
        
        return {
            request: {
                login: email,
                password,
            },
            response: {
                respondWithMissingParameter(parameterName) {
                    next(MISSING_PARAM_ERROR(parameterLabels[parameterName]))
                },
                respondWithUserNotFound() {
                    next(USER_NOT_FOUND)
                },
                respondWithUserDisabled() {
                    next(ACCESS_DENIED_ERROR('Sorry, your account has been disabled'))
                },
                respondWithWrongPassword() {
                    next(WRONG_PASSWORD_ERROR)
                },
                respondWithUserNotVerified() {
                    next(USER_NOT_VERIFIED)
                },
                respondWithUserAndToken(user, token) {
                    res.json({
                        data: {
                            user,
                            accessToken: token
                        },
                    })
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    const forgot = (req, res, next) => {
        const { email } = req.body
        const parameterLabels = {
            login: 'email',
        }
        
        return {
            request: {
                login: email,
            },
            response: {
                respondWithMissingParameter(parameterName) {
                    next(MISSING_PARAM_ERROR(parameterLabels[parameterName]))
                },
                respondWithUserNotFound() {
                    next(USER_NOT_FOUND)
                },
                respondWithTokenError() {
                    next(TOKEN_GENERATION_ERROR)
                },
                respondWithSuccess() {
                    res.status(NO_CONTENT).end()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    const reset = (req, res, next) => {
        const { token } = req.params
        const { password, confirm } = req.body
        
        return {
            request: {
                token,
                password,
                confirm,
            },
            response: {
                respondWithMissingParameter(parameterName) {
                    next(MISSING_PARAM_ERROR(parameterName))
                },
                respondWithPasswordMismatch() {
                    next(MISMATCH_PASSWORD)
                },
                respondWithUserNotFound() {
                    next(USER_NOT_FOUND)
                },
                respondWithSuccess() {
                    res.status(NO_CONTENT).end()
                },
                respondWithError(err) {
                    next(err)
                },
            },
        }
    }
    
    return {
        register,
        verify,
        loginWithPassword,
        forgot,
        reset,
    }
}
