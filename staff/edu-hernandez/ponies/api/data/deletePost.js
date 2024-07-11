import fs from 'fs'

function deletePost(condition) {
    // const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []
    let posts = fs.readFileSync('./data/posts.json', 'utf8')

    const postDeleted = posts.findIndex(condition)

    if (postDeleted > -1) {
        posts.splice(postDeleted, 1)

        // localStorage.posts = JSON.stringify(posts)
        posts = JSON.stringify(postDeleted)

        fs.writeFileSync('.data/posts.json', posts)
    }
}

export default deletePost