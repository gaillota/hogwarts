const SimpleSchema = require('simpl-schema')

const { middlewaresField, rolesField, customRoutesField } = require('./model.schema')

const UserConfigSchema = new SimpleSchema({
    disabled: {
        type: Boolean,
        optional: true,
        defaultValue: false,
    },
    ...rolesField,
})

const schema = new SimpleSchema({
    port: {
        type: Number,
        defaultValue: 3000,
    },
    endpoint: {
        type: String,
        regEx: /\/.*/,
        defaultValue: '/api',
    },
    mimeTypes: {
        type: Array,
        optional: true,
        autoValue() {
            if (this.isSet) {
                return Array.from(this.value)
            }
        },
    },
    'mimeTypes.$': {
        type: String,
    },
    secret: {
        type: String,
    },
    users: {
        type: UserConfigSchema,
        optional: true,
    },
    softDelete: {
        type: Boolean,
        defaultValue: false,
    },
    gateway: {
        type: Function,
        optional: true
    },
    ...middlewaresField,
    ...customRoutesField,
})

module.exports = schema
