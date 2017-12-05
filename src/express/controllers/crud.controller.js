const {
    fetchDocumentById,
    fetchDocuments,
    insertDocument,
    updateDocument,
    deleteDocument,
} = require('../../core/logic/crud')

const expressCrudAdapter = require('../adapters/crud.adapter')
const databaseCrudAdapter = require('../../database/adapters/crud.adapter')

module.exports = (modelName, manager) => {
    // Adapters
    const expressAdapter = expressCrudAdapter(modelName)
    const databaseAdapter = databaseCrudAdapter(manager)
    
    const findBy = (req, res, next) => {
        const { request, response } = expressAdapter.findBy(req, res, next)
        const { data } = databaseAdapter.findBy()
        
        fetchDocuments({
            request,
            response,
            data,
        })
    }
    
    const create = (req, res, next) => {
        const { request, response } = expressAdapter.create(req, res, next)
        const { data } = databaseAdapter.create()
        
        insertDocument({
            request,
            response,
            data,
        })
    }
    
    const findOne = (req, res, next) => {
        const { request, response } = expressAdapter.findOne(req, res, next)
        const { data } = databaseAdapter.findOne()
        
        fetchDocumentById({
            request,
            response,
            data,
        })
    }
    
    const replace = (req, res, next) => {
        // TODO: Implement function
    }
    
    const update = (req, res, next) => {
        const { request, response } = expressAdapter.update(req, res, next)
        const { data } = databaseAdapter.update()
        
        updateDocument({
            request,
            response,
            data,
        })
    }
    
    const remove = (req, res, next) => {
        const { request, response } = expressAdapter.remove(req, res, next)
        const { data } = databaseAdapter.remove()
        
        deleteDocument({
            request,
            response,
            data,
        })
    }
    
    return {
        findBy,
        create,
        findOne,
        update,
        replace,
        remove
    }
}
