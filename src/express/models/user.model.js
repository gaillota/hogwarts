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
    tokens: {
        verification: String,
        reset: String
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128,
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
    '76c31503f8d38fc4559d05d0c8d5836356f314f52b1bf253e64908c0dcdb6303a7133b3fa1c29a75ac4145751a9d6632e544457c9899efd557b893e9f534d859'
]

module.exports = ({ roles, defaultRole, userSchema }) => ({
    ...getSchema({ roles, defaultRole }),
    userSchema,
})
