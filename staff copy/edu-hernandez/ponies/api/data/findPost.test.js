import fs from 'fs'

let json = fs.readFileSync('/data/posts.json', 'utf8')
// const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

function findPost(condition) {
    const post = json ? JSON.parse(json) : []

    post = posts.find(condition)

    fs.writeFileSync('./data/posts.json', json)

    return post || null
}

export default findPost