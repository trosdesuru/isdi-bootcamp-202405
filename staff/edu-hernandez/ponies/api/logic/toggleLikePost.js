import data from '../../app/data/index'

function toggleLikePost(username, postId) {
    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('User not found')

    if (postId.trim().length === 0) throw new Error('invalid postId')

    const post = data.findPost(post => post.id === postId)

    if (post === null)
        throw new Error('post not found')

    const index = post.likes.indexOf(sessionStorage.username)

    if (index < 0)
        post.likes.push(sessionStorage.username)
    else
        post.likes.splice(index, 1)

    data.updatePost(post => post.id === postId, post)
}

export default toggleLikePost