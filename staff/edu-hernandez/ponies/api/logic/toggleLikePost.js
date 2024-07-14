import data from '../../app/data/index'

import validate from '../validate'

function toggleLikePost(username, postId) {
    validate.username(username)
    validate.postId(postId)
    
    const user = data.findUser(user => user.username === username)

    if (!user) throw new Error('User not found')

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