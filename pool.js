// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'postgres',
//     host: '116.203.116.183',
//     database: 'nodejs_test',
//     password: 'hp',
//     port: 5432,
// })

// module.exports = pool;
const {SQLExecuter} = require('./SqlExecuter')
let executer
function getConnection(type = 'postgis') {

    if (type === 'postgis') {

        if (!executer) {

            const kgmAdminClientDbInfo = {
                user: 'postgres',
                host: '116.203.116.183',
                database: 'nodejs_test',
                password: 'hp',
                port: 5432,
                application_name: 'KGM_Admin_' + process.pid
            }

            executer = new SQLExecuter(kgmAdminClientDbInfo)
        }
        return executer
    }

}

module.exports = { getConnection };