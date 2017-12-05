const { Pool } = require('pg')

const connect = (config = {}) => new Promise((res, rej) => {
    const {
        user = 'dbuser',
        host = 'database.server.com',
        database = 'mydb',
        password = 'secretpassword',
        port = 3211,
    } = config
    const pool = new Pool({
        user,
        host,
        database,
        password,
        port,
        ...config
    })

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect((err) => {
        if (err)
            return rej(err)

        res()
    })
})

module.exports = {
    connect: connect,
    close: pool.end
}
