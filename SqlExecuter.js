const SQLCreator = require('./SQLCreator')



const { Pool } = require('pg')
class SQLExecuter {

    constructor(connectionParams) {
        this._pool = new Pool(connectionParams)
    }

    async getPool() {
        return await this._pool.connect()
    }



    async execute(db) {
        let connection
        try {
            connection = await this.getPool()
            let result = await connection.query(db.sql, db.params)
            connection.release()
            return {
                success: true,
                result: result
            }

        } catch (error) {
            if (connection) connection.release()
            return {
                success: false,
                error: error
            }
        }
    }

    async listUser() {
        const db = SQLCreator.listUser()
        const response = await this.execute(db)
        if (response.success) {
            const { result } = response
            return result.rows
        } else {
            return response.error
        }
    }

}

module.exports = { SQLExecuter } 