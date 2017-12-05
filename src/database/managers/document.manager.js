module.exports = class DocumentManager {
    constructor(gateway) {
        this.gateway = gateway
    }

    create(document) {
        return this.gateway.insert(document)
    }

    getDocumentsBy(criteria) {
        return this.gateway.findBy(criteria)
    }

    getDocumentById(id) {
        return this.gateway.findById(id)
    }

    update(id, document, replace = false) {
        return this.gateway.update(id, document, replace)
    }

    remove(id) {
        return this.gateway.remove(id)
    }
}
