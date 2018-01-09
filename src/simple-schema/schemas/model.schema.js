const SimpleSchema = require('simpl-schema')

const rolesField = {
    roles: {
        type: Array,
        optional: true,
        autoValue() {
            if (this.isSet) {
                return Array.from(this.value)
            }
        },
    },
    'roles.$': {
        type: SimpleSchema.oneOf(
            String,
            Function,
        ),
    },
}

const middlewaresField = {
    middlewares: {
        type: Array,
        optional: true,
        autoValue() {
            if (this.isSet) {
                return Array.from(this.value)
            }
        },
    },
    'middlewares.$': {
        type: Function,
    },
}

const CustomRoutesSchema = new SimpleSchema({
    endpoint: {
        type: String,
    },
    method: {
        type: String,
    },
    anonymous: {
        type: Boolean,
        defaultValue: false,
    },
    ...rolesField,
    ...middlewaresField,
    action: {
        type: Function,
    },
})

const customRoutesField = {
    customRoutes: {
        type: Array,
        optional: true,
    },
    'customRoutes.$': {
        type: CustomRoutesSchema,
    },
}

const schema = new SimpleSchema({
    name: {
        type: String,
    },
    endpoint: {
        type: String,
        regEx: /\/.*/,
    },
    schema: {
        type: Object,
        blackbox: true,
    },
    timestamps: {
        type: Boolean,
        optional: true,
    },
    restricted: {
        type: Boolean,
        defaultValue: false,
    },
    defaultCrud: {
        type: Boolean,
        defaultValue: true,
    },
    softDelete: {
        type: Boolean,
        defaultValue: false,
    },
    admin: {
        type: Boolean,
        defaultValue: false,
    },
    ...customRoutesField,
    ...rolesField,
    ...middlewaresField,
})

module.exports = schema
module.exports.customRoutesField = customRoutesField
module.exports.middlewaresField = middlewaresField
module.exports.rolesField = rolesField
