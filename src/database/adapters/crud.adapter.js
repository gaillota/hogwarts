module.exports = (manager) => {
    const findOne = () => ({
        data: {
            getDocumentById(id) {
                return manager.getDocumentById(id)
            },
        },
    })
    
    const findBy = () => ({
        data: {
            getDocumentsBy(criteria) {
                return manager.getDocumentsBy(criteria)
            },
        },
    })
    
    const create = () => ({
        data: {
            insertDocument(document) {
                return manager.create(document)
            },
        },
    })
    
    const update = () => ({
        data: {
            updateDocumentWithId(id, doc) {
                return manager.update(id, doc)
            },
        },
    })
    
    const replace = () => ({
        data: {
        
        }
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
        findBy,
        create,
        update,
        remove,
        replace
    }
}
