const bcrypt = require('../../utils/bcrypt')

module.exports = ({ gateway }) => {
    function getId(user) {
        return user._id
    }
    
    function findOneBy(query) {
        // TODO: Work on that `then` bullshit
        return gateway.list(query, 1).then(([user]) => user)
    }
    
    function findById(id) {
        return gateway.findById(id)
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
    
    function findOneByVerificationToken(token) {
        return findOneBy({ verification_token: token })
    }
    
    // Do not unset verify_token in case verifyUser gets called several times
    function verifyUser(user) {
        return gateway.update(getId(user), {
            verified: true,
        })
    }
    
    function removeVerificationToken(user) {
        return gateway.update(getId(user), {
            verification_token: ''
        })
    }
    
    function checkPassword(password, user) {
        return bcrypt.checkPassword(password, user.password)
    }
    
    function persistToken(user, token) {
        return gateway.update(getId(user), {
            reset_token: token,
        })
    }
    
    function findOneByResetToken(token) {
        return findOneBy({
            reset_token: token
        })
    }
    
    function updatePassword(user, password) {
        return gateway.update(getId(user), {
            password
        })
    }
    
    function removeResetToken(user) {
        return gateway.update(getId(user), {
            reset_token: ""
        })
    }
    
    function updateLastConnectionAt(user) {
        return gateway.update(getId(user), {
            lastConnectionAt: new Date()
        })
    }
    
    return {
        getId,
        findOneBy,
        createUser,
        persistVerificationTokenForUser,
        findOneByVerificationToken,
        verifyUser,
        removeVerificationToken,
        checkPassword,
        persistToken,
        findOneByResetToken,
        updatePassword,
        removeResetToken,
        updateLastConnectionAt,
        findById
    }
}
