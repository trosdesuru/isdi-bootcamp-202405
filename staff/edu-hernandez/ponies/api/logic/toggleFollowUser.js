import data from '../../app/data/index'

import validate from '../validate.js'

function toggleFollowUser(username, targetUsername) {
    validate.username(username)
    validate.username(targetUsername)

    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('user not found')

    const following = data.findUser(user => user.username === taegetUsername)

    if (!following) throw new Error('following user not found')

    const index = user.following.indexOf(username)

    if (index < 0)
        user.following.push(targetUsername)
    else
        user.following.splice(index, 1)

    data.updateUser(user => user.username === sessionStorage.username, user)
}

export default toggleFollowUser