module.exports = class DocumentManager {
    constructor(gateway) {
        this.gateway = gateway
    }
    
    create(document) {
        return this.gateway.create(document)
    }
    
    list(query, limit, offset) {
        const options = {
            skip: offset,
            limit,
        }
        
        return this.gateway.list(query, null, options)
    }
    
    getDocumentById(id) {
        return this.gateway.findById(id)
    }
    
    update(id, document, replace = false) {
        return this.gateway.replace(id, document, replace)
    }
    
    remove(id) {
        return this.gateway.remove(id)
    }
    
    count(query) {
        return this.gateway.count(query)
    }
}
