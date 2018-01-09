function parseSchema({ schema, doc }) {
    // Clean document (set autoValue for instance)
    const cleanDoc = schema.clean(doc)
    // Validate doc against schema (+ set defaultValue)
    schema.validate(cleanDoc)
    
    return cleanDoc
}

module.exports = {
    parseSchema,
}
