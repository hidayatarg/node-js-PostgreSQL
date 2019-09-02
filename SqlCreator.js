function listUser() {
    return {
        sql: 'SELECT * FROM users ORDER BY id ASC'
    }
}


module.exports = {
    listUser
}