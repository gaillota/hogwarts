const mysql = require('mysql')

let connection

const connect = (config = {}) => new Promise((res, rej) => {
    // Set default values
    const {
        host = 'localhost',
        user = 'me',
        password = 'secret',
        database = 'hogwarts',
    } = config
    connection = mysql.createConnection({
        host,
        user,
        password,
        database,
        ...config,
    })
    
    connection.connect((err) => {
        if (err) {
            return rej(err)
        }
        
        res()
    })
})

const close = (force = false) => new Promise((res, rej) => {
    if (force) {
        connection.destroy()
        return res()
    }
    
    connection.end((err) => {
        if (err) {
            return rej(err)
        }
        
        res()
    })
})

module.exports = {
    connect: connect,
    close,
}
