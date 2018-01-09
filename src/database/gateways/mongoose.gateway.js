const mongoose = require('mongoose')

module.exports = ({ modelName, schema, timestamps = true }) => {
    const modelSchema = new mongoose.Schema(schema, {
        timestamps,
    })
    const Model = mongoose.model(modelName, modelSchema)
    
    /**
     * Fetch documents by criteria
     *
     * @param query
     * @param limit
     * @param offset
     * @param fields
     * @return Promise<Array>
     */
    const list = (query, limit, offset, fields) => {
        const options = {
            skip: offset,
            limit,
        }
        
        return Model.find(query, fields, options).exec()
    }
    
    /**
     * Count documents (database system usually have built-in count function)
     *
     * @param query
     * @return Promise<Number>
     */
    const count = (query = {}) => Model.count(query).exec()
    
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
     * @return Promise<Object>
     */
    const findById = id => Model.findById(id).exec()
    
    /**
     * Update document
     *
     * @param id
     * @param updatedFields
     * @param options
     * @return Promise<Object>
     */
    const update = (id, updatedFields, options = {}) => Model.findByIdAndUpdate(id, updatedFields, {
        new: true,
        ...options
    }).exec()
    
    /**
     * Replace whole document
     *
     * @param id
     * @param newDocument
     * @return Promise<Object>
     */
    const replace = (id, newDocument) => update(id, newDocument, {
        overwrite: true,
        upsert: true,
    })
    
    /**
     * Remove document by ID
     *
     * @param id
     * @return Promise
     */
    const remove = id => Model.findByIdAndRemove(id).exec()
    
    return {
        list,
        count,
        create,
        findById,
        update,
        replace,
        remove,
    }
}
