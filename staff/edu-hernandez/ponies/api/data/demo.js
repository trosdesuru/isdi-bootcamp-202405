import fs from 'fs'

const users = []

const bruno = {
    name: 'Bruno',
    surname: 'Diaz',
    email: 'bruno@diaz.com',
    username: 'brunodiaz',
    password: '123123123'
}

const ricardo = {
    name: 'Ricardo',
    surname: 'Tapia',
    email: 'ricardo@tapia.com',
    username: 'rtapia',
    password: '123123123'
}

const edu = {
    name: 'edu',
    surname: 'hdx',
    email: 'edu@hdz.com',
    username: 'eduhdz',
    password: '123123123'
}

users.push(bruno)
users.push(ricardo)
users.push(edu)

const usersJSON = JSON.stringify(users)

console.log('usersJSON', usersJSON)

fs.writeFileSync('./data/users.json', usersJSON)

const usersJSON2 = fs.readFileSync('./data/users.json', 'utf-8')

console.log('usersJSON2', usersJSON2)

const posts = []

const postRuben = {
    username: 'rubendiaz',
    imgUrl: 'imgUrlrubendiaz',
    caption: 'Hello',
    postDate: 'thursday/11/07/2024/15.45',
    PostId: 'postIdrubendiaz',
    favs: [],
    likes: []
}

const postRicardo = {
    username: 'rtapia',
    imgUrl: 'imgUrlrtapia',
    caption: 'World',
    postDate: 'thursday/11/07/2024/21.03',
    PostId: 'postIdrtapia',
    favs: [],
    likes: []
}

const postEdu = {
    username: 'eduhdz',
    imgUrl: 'imgUrleduhdz',
    caption: 'Hello, World',
    postDate: 'thursday/11/07/2024/18.30',
    PostId: 'postIdeduhdz',
    favs: [],
    likes: []
}

posts.push(postRuben)
posts.push(postRicardo)
posts.push(postEdu)

const postsJSON = JSON.stringify(posts)

console.log('postsJSON', postsJSON)

fs.writeFileSync('./data/posts.json', postsJSON)

const postsJSON2 = fs.readFileSync('./data/posts.json', 'utf8')

console.log('postsJSON2', postsJSON2)