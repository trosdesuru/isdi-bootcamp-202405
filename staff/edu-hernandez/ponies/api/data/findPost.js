import fs from 'fs'

function findPost(condition) {
    // const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []
    let json = fs.readFileSync('/data/posts.json', 'utf8')

    const post = json ? JSON.parse(json) : []

    post = posts.find(condition)

    fs.writeFileSync('./data/posts.json', json)

    return post || null
}

export default findPost