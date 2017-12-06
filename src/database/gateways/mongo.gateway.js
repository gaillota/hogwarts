const mongoose = require('mongoose')

module.exports = ({ modelName, schema, timestamps }) => {
    console.log('schema:', schema)
    const modelSchema = new mongoose.Schema(schema, {
        timestamps
    })
    const Model = mongoose.model(modelName, modelSchema)
    
    /**
     * Find document by criteria
     *
     * @param query
     * @param limit
     * @param offset
     * @param fields
     * @return Promise
     */
    const list = (query, limit, offset, fields) => {
        const options = {
            skip: offset,
            limit,
        }
        
        return Model.find(query, fields, options).exec()
    }
    
    /**
     * Create new document
     *
     * @param newDocument
     * @return Promise
     */
    const create = newDocument => Model.create(newDocument)
    
    /**
     * Fetch a document by ID
     *
     * @param id
     * @return Promise
     */
    const findById = id => Model.findById(id).exec()
    
    /**
     * Replace whole document
     *
     * @param id
     * @param newDocument
     * @return Promise
     */
    const replace = (id, newDocument) => Model.findByIdAndUpdate(id, newDocument).exec()
    
    /**
     * Remove document by ID
     *
     * @param id
     * @return Promise
     */
    const remove = id => Model.findByIdAndRemove(id).exec()
    
    /**
     * Count documents
     *
     * @param query
     * @return Promise
     */
    const count = (query = {}) => Model.count(query).exec()
    
    return {
        list,
        create,
        findById,
        replace,
        remove,
        count,
    }
}
