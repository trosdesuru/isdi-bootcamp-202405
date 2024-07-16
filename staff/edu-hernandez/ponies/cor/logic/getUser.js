import data from '../data/index.js'

import validate from '../validate.js'

const getUser = username => {
    validate.username(username)

    const user = data.findUser(user => user.username === username)

    if (user === null)
        throw new Error('user not found')

    delete user.password

    return user.name
}

export default getUser