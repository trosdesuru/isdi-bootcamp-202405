import fs from 'fs'

function findPosts(condition) {
        const json = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

        const posts = json ? JSON.parse(json) : []

        const foundPosts = posts.filter(condition)

        return foundPosts
}

export default findPosts