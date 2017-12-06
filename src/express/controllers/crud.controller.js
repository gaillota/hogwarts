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
    
    function list(req, res, next) {
        const { request, response } = expressAdapter.list(req, res, next)
        const { data } = databaseAdapter.list()
        
        fetchDocuments({
            request,
            response,
            data,
        })
    }
    
    function create(req, res, next) {
        const { request, response } = expressAdapter.create(req, res, next)
        const { data } = databaseAdapter.create()
        
        insertDocument({
            request,
            response,
            data,
        })
    }
    
    function one(req, res, next) {
        const { request, response } = expressAdapter.one(req, res, next)
        const { data } = databaseAdapter.one()
        
        fetchDocumentById({
            request,
            response,
            data,
        })
    }
    
    function replace(req, res, next) {
        const { request, response } = expressAdapter.replace(req, res, next)
        const { data } = databaseAdapter.replace()
        
        updateDocument({
            request,
            response,
            data,
        })
    }
    
    function update(req, res, next) {
        // TODO: Implement
    }
    
    function remove(req, res, next) {
        const { request, response } = expressAdapter.remove(req, res, next)
        const { data } = databaseAdapter.remove()
        
        deleteDocument({
            request,
            response,
            data,
        })
    }
    
    return {
        list,
        create,
        one,
        update,
        replace,
        remove
    }
}
