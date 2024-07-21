import data from '../data/index.js'

const updateAvatar = (username, newAvatar) => {
    // TODO input validation

    if (!newAvatar.startsWith('http')) throw new Error('invalid image')

    const user = data.findUser(user => user.username === username)

    if (user === null) throw new Error('user not found')

    user.avatar = newAvatar

    data.updateUser(user => user.username === username, user)
}

export default updateAvatar