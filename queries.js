const { getConnection } = require('./pool')
const bcrypt = require('bcryptjs')

const dbConnection = getConnection()

// old
// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }

const getUsers = async (request, response) => {
    const result = await dbConnection.listUser()
    console.log('gelen cevap: ', result);

}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const {
        name,
        email,
        password
    } = request.body

    bcrypt.hash(password, 8, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hash], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(201).json({
                    success: true,
                    message: 'User has been created successfully'
                })
            })
        }
    })


}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {
        name,
        email
    } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}