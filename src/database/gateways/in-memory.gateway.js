const _isArray = require('lodash/isArray')
const _isEqual = require('lodash/isEqual')

module.exports = class InMemoryGateway {
    constructor(fixtures) {
        this.entities = _isArray(fixtures) ? fixtures : []
    }

    insert(newEntity) {
        return new Promise((resolve) => {
            this.entities = [
                ...this.entities,
                newEntity,
            ]

            resolve(1)
        })
    }

    findBy(criteria) {
        return new Promise((resolve) => {
            const entities = this.entities.filter(e => _isEqual(e, {...e, ...criteria}))
            resolve(entities)
        })
    }

    findById(id) {
        return new Promise((resolve) => {
            const entity = this.entities.find(e => e.id === id)
            resolve(entity)
        })
    }

    update(id, entity, replace = false) {
        return new Promise((resolve) => {
            this.entities = this.entities.map((e) => {
                if (e.id === id) {
                    return replace ? entity : {
                        ...e,
                        ...entity
                    }
                }

                return entity
            })

            resolve()
        })
    }


    remove(id) {
        return new Promise((resolve) => {
            this.entities = this.entities.filter(e => e.id !== id)
            resolve()
        })
    }
}
