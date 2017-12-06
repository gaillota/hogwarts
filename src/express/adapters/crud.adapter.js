const { NO_CONTENT } = require('http-status')

const {
    NOT_FOUND_ERROR,
} = require('../../utils/errors')

module.exports = (modelName) => {
    // GET /:modelName/
    const list = (req, res, next) => ({
        request: {
            query: req.query.query,
            offset: req.query.offset,
            count: req.query.count,
            page: req.query.page,
        },
        response: {
            respondWithNoDocuments({ count, offset, total }) {
                res.json({
                    data: {
                        [modelName]: [],
                    },
                    count,
                    offset,
                    total,
                })
            },
            respondWithFoundDocuments({ documents, count, offset, total }) {
                res.json({
                    data: {
                        [modelName]: documents,
                    },
                    count,
                    offset,
                    total
                })
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
            respondWithSuccess() {
                res.status(NO_CONTENT).end()
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
                res.json({
                    data: document,
                })
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
                res.json({
                    data: result,
                })
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
                res.status(NO_CONTENT).end()
            },
            respondWithError(err) {
                next(err)
            },
        },
    })
    
    return {
        findOne,
        list,
        create,
        update,
        replace,
        remove,
    }
}
