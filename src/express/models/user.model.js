const getSchema = ({ roles }) => ({
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
    roles: {
        type: [String],
        enum: roles,
        default: [],
    },
    lastLogin: Date,
    disabled: Boolean,
})

const tokens = [
    'f5a4bf6180398d7d6f801b2450c18dd5af887d039c6e80e8bfb5e0eb09991acba85b7d1afeaa094a931894102e91bf5d0adeba43e89df00e51e9d6e6d9322bc2'
]

module.exports = ({ roles, defaultRole, userSchema }) => ({
    ...getSchema({ roles, defaultRole }),
    userSchema,
})
