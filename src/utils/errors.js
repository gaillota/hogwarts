// TODO: Review this

module.exports.CONTENT_TYPE_ERROR = {
    status: 400,
    message: 'Content-Type not allowed',
}

module.exports.USER_ALREADY_EXISTS = {
    status: 400,
    message: 'Login already taken',
}

module.exports.USER_NOT_FOUND = {
    status: 400,
    message: 'User not found',
}

module.exports.WRONG_PASSWORD_ERROR = {
    status: 400,
    message: 'Wrong password',
}

module.exports.MISMATCH_PASSWORD = {
    status: 400,
    message: 'The passwords does not match',
}

module.exports.ACCESS_DENIED_ERROR = (message = 'Access denied') => ({
    status: 403,
    message
})

module.exports.NOT_FOUND_ERROR = {
    status: 404,
    message: 'Content not found',
}

module.exports.MISSING_PARAM_ERROR = param => ({
    status: 422,
    message: `Parameter missing: ${param}`,
})

module.exports.EMPTY_BODY = {
    status: 422,
    message: 'Body is empty'
}
