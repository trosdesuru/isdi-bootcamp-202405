import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'

import validate from '../validate.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function deletePost(condition) {
    if (typeof condition !== 'function') throw new Error 
    
    let json = fs.readFileSync(`${__dirname}/posts.json`, 'utf8')

    let posts =  json ? JSON.parse(json) : []

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postIndex, 1)

        // localStorage.posts = JSON.stringify(posts)
        let updatedPosts = JSON.stringify(posts)

        fs.writeFileSync(`${__dirname}/posts.json`, updatedPosts)

        console.log(updatedPosts)
    }
}

export default deletePost