// TODO: Set default user model
module.exports = {
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    verifyToken: {
        token: {
            type: String,
        },
        when: {
            type: Date,
        },
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    profile: {
        type: Object,
        default: {},
    },
    disabled: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
    },
    lastConnectionAt: {
        type: Date,
        default: Date.now,
    },
}
