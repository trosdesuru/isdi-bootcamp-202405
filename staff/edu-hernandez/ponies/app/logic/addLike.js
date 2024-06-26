{
    const addLike = (postId) => {

        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []
        const user = users.find(user => user.username === sessionStorage.username)

        if (user.username === undefined) throw new Error('User not found')

        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []
        const post = posts.find(post => post.id === postId)

        if (post === undefined) throw new Error('Post not found')
        const usernameIndex = post.likeUsers.finIndex(username) 

        if (usernameIndex !== -1)
            post.likeUsers.splice(users.username)

        else
            post.likeUsers.push(user.username)

        localStorage.posts = JSON.stringify(posts)
    }

    logic.addLike = addLike
}