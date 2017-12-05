const bcrypt = require('bcrypt')

const DocumentManager = require('./document.manager')
const SHA256 = require('../../utils/sha256')

module.exports = class UserManager extends DocumentManager {
    constructor(gateway) {
        super(gateway)
        
        this.ROUND = 10
    }
    
    getId(user) {
        console.log(`getId: ${user._id}`)
        return user._id
    }
    
    hashPassword(password) {
        return bcrypt.hash(SHA256(password), this.ROUND)
    }
    
    verifyPassword(user, password) {
        return bcrypt.compare(SHA256(password), user.password.hash)
    }
    
    createUser(user) {
        return this.create(user)
    }
    
    findOneByToken(token) {
        return this.findOneBy({ verifyToken: token })
    }
    
    // Do not unset verifyToken in case verifyUser gets called several times
    verifyUser(user) {
        return this.update(this.getId(user), {
            verified: true,
        })
    }
    
    persistVerificationTokenForUser(user, token) {
        return this.update(this.getId(user), {
            verifyToken: token,
        })
    }
    
    findOneById(id) {
        return this.findOneBy({ _id: id })
    }
    
    findOneBy(criteria) {
        return this.findBy(criteria).then((data) => {
            if (data.length && data.length > 1) {
                throw new Error('Query has more than 1 result')
            }
            
            return data[0]
        })
    }
    
    findBy(criteria) {
        return this.gateway.findBy(criteria)
    }
    
    update(id, props) {
        console.log(props)
        // TODO: Update with a mergeDeep
        return this.findOneById(id).then((user) => {
            console.log('user:', user.toObject())
            return this.gateway.update(id, {
                ...user,
                ...props
            })
        },)
    }
}
