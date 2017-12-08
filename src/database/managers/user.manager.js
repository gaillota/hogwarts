const bcrypt = require('../../utils/bcrypt')

module.exports = ({ gateway }) => {
    function getId(user) {
        return user._id
    }
    
    function findOneBy(query) {
        return gateway.list(query, 1).then(([user]) => user)
    }
    
    function createUser(email, hash) {
        const user = {
            email,
            password: hash,
        }
        
        return gateway.create(user)
    }
    
    function persistVerificationTokenForUser(user, token) {
        return gateway.update(getId(user), {
            verification_token: token,
        })
    }
    
    function findOneByToken(token) {
        return findOneBy({ verification_token: token })
    }
    
    // Do not unset verifyToken in case verifyUser gets called several times
    function verifyUser(user) {
        return gateway.update(getId(user), {
            verified: true,
        })
    }
    
    function checkPassword(password, user) {
        return bcrypt.checkPassword(password, user.password)
    }
    
    
    // findOneById(id) {
    //     return this.findOneBy({ _id: id })
    // }
    //
    // findOneBy(criteria) {
    //     return this.list(criteria).then((data) => {
    //         if (data.length && data.length > 1) {
    //             throw new Error('Query has more than 1 result')
    //         }
    //
    //         return data[0]
    //     })
    // }
    //
    // findBy(criteria) {
    //     return this.gateway.list(criteria)
    // }
    //
    // update(id, props) {
    //     console.log(props)
    //     // TODO: Update with a mergeDeep
    //     return this.findOneById(id).then((user) => {
    //         console.log('user:', user.toObject())
    //         return this.gateway.replace(id, {
    //             ...user,
    //             ...props
    //         })
    //     },)
    // }
    
    return {
        getId,
        findOneBy,
        createUser,
        persistVerificationTokenForUser,
        findOneByToken,
        verifyUser,
        checkPassword,
    }
}
