const {
    NOT_FOUND_ERROR,
} = require('../../utils/errors')

module.exports = (modelName) => {
    // GET /:modelName/
    const findBy = (req, res, next) => ({
        request: {
            criteria: req.query,
        },
        response: {
            respondWithNoDocuments() {
                req.output = {
                    data: {
                        [modelName]: [],
                    },
                }
                next()
            },
            respondWithFoundDocuments(documents) {
                req.output = {
                    data: {
                        [modelName]: documents,
                    },
                }
                next()
            },
            respondWithError(err) {
                next(err)
            },
        },
    })
    
    // POST /:modelName/
    const create = (req, res, next) => ({
        request: {
            document: req.body,
        },
        response: {
            respondWithResult(result) {
                req.response = {
                    result,
                }
                next()
            },
            respondWithError(err) {
                next(err)
            },
        },
    })
    
    // GET /:modelName/:id
    const findOne = (req, res, next) => ({
        request: {
            documentId: req.params.id,
        },
        response: {
            respondWithDocumentNotFound() {
                return next(NOT_FOUND_ERROR)
            },
            respondWithCorrectDocument(document) {
                req.response = {
                    data: document,
                }
                next()
            },
            respondWithError(err) {
                next(err)
            },
        },
    })
    
    // PATCH /:modelName/:id
    const update = (req, res, next) => ({
        request: {
            documentId: req.params.id,
            newDocument: req.body,
        },
        response: {
            respondWithResult(result) {
                req.response = {
                    result,
                }
                next()
            },
            respondWithError(err) {
                next(err)
            },
        },
    })
    
    // PUT /:modelName/:id
    const replace = (req, res, next) => {
    
    }
    
    // DELETE /:modelName/:id
    const remove = (req, res, next) => ({
        request: {
            documentId: req.params.id,
        },
        response: {
            respondWithResult() {
                req.response = {
                    status: 204,
                }
                next()
            },
            respondWithError(err) {
                next(err)
            },
        },
    })
    
    return {
        findOne,
        findBy,
        create,
        update,
        replace,
        remove,
    }
}
