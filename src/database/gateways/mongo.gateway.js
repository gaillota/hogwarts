const mongoose = require('mongoose')

const { Schema } = mongoose

module.exports = class MongoGateway {
    constructor(modelName, schema = {}) {
        this.modelName = modelName
        this.schema = new Schema(schema)
        this.model = mongoose.model(this.modelName, this.schema)
    }
    
    insert(newDocument) {
        return new Promise((resolve, reject) => {
            const document = new this.model(newDocument)
            document.save((err, entity) => {
                if (err) {
                    return reject(err)
                }
                
                resolve(entity)
            })
        })
    }
    
    findBy(criteria) {
        return new Promise((resolve, reject) => {
            this.model.find(criteria, (err, documents) => {
                if (err) {
                    return reject(err)
                }
                
                resolve(documents)
            })
        })
    }
    
    findById(id) {
        return new Promise((resolve, reject) => {
            this.model.findById(id, (err, document) => {
                if (err) {
                    return reject(err)
                }
                
                resolve(document)
            })
        })
    }
    
    update(id, newDocument) {
        return new Promise((resolve, reject) => {
            this.model.findByIdAndUpdate(id, newDocument, (err) => {
                if (err) {
                    return reject(err)
                }
                
                resolve(1)
            })
        })
    }
    
    
    remove(id) {
        return new Promise((resolve, reject) => {
            this.model.findByIdAndRemove(id, (err) => {
                if (err) {
                    return reject(err)
                }
                
                resolve(1)
            })
        })
    }
}
