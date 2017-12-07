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
                console.log('document:', document)
                return manager.create(document)
            },
        },
    })
    
    const one = () => ({
        data: {
            getDocumentById(id) {
                return manager.findById(id)
            },
        },
    })
    
    const update = () => ({
        data: {
            updateDocumentWithId(id, updatedFields) {
                return manager.update(id, updatedFields)
            },
        },
    })
    
    const replace = () => ({
        data: {
            updateDocumentWithId(id, newDocument) {
                return manager.replace(id, newDocument)
            },
        },
    })
    
    const remove = () => ({
        data: {
            deleteDocumentWithId(id) {
                return manager.remove(id)
            },
        },
    })
    
    return {
        one,
        list,
        create,
        update,
        remove,
        replace,
    }
}
