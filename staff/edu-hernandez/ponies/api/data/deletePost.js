import fs from 'fs'

function deletePost(condition) {
    // const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []
    let json = fs.readFileSync('./data/posts.json', 'utf8')

    const posts =  json ? JSON.parse(json) : []

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postDeleted, 1)

        // localStorage.posts = JSON.stringify(posts)
        posts = JSON.stringify(postDeleted)

        fs.writeFileSync('.data/posts.json', json)
    }
}

export default deletePost