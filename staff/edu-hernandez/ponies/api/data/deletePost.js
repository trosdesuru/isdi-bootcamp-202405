import fs from 'fs'

function deletePost(condition) {
    if (typeof condition !== 'function') throw new Error 
    
    let json = fs.readFileSync('./data/posts.json', 'utf8')

    let posts =  json ? JSON.parse(json) : []

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postIndex, 1)

        // localStorage.posts = JSON.stringify(posts)
        let updatedPosts = JSON.stringify(posts)

        fs.writeFileSync('./data/posts.json', updatedPosts)

        console.log(updatedPosts)
    }
}

export default deletePost