const getSchema = ({ roles, defaultRole }) => ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    verification_token: String,
    reset_token: String,
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    services: {
        facebook: String,
        google: String,
    },
    role: {
        type: String,
        enum: roles,
        default: defaultRole,
    },
    lastLogin: Date,
    disabled: Boolean,
})

const tokens = [
    '078a1bc3c6a21a0b0aa38a1d2da962bd9b6cdbed0f1b7a53832423dffc41daefafd3ffa69289688e271c16f67ec257af2d162e5f98beec19fef1e67553077c2e' // manzagregine+test@gmail.com
]

module.exports = ({ roles, defaultRole, userSchema }) => ({
    ...getSchema({ roles, defaultRole }),
    userSchema,
})
