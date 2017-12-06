module.exports = (manager) => {
    const list = () => ({
        data: {
            fetchDocumentsBy({ query, limit, offset }) {
                return manager.list(query, limit, offset)
            },
            getDocumentsCount() {
                return manager.count()
            }
        },
    })
    
    const create = () => ({
        data: {
            persistDocument(document) {
                return manager.create(document)
            },
        },
    })
    
    const findOne = () => ({
        data: {
            getDocumentById(id) {
                return manager.getDocumentById(id)
            },
        },
    })
    
    const update = () => ({
        data: {
            updateDocumentWithId(id, doc) {
                return manager.replace(id, doc)
            },
        },
    })
    
    const replace = () => ({
        data: {},
    })
    
    const remove = () => ({
        data: {
            deleteDocumentWithId(id) {
                return manager.remove(id)
            },
        },
    })
    
    return {
        findOne,
        list,
        create,
        update,
        remove,
        replace,
    }
}
