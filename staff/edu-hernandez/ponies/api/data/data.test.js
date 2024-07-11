import fs from 'fs'

console.log('USERS')

const users = []

const user1 = {
    name: 'Ruben',
    surname: 'Diaz',
    userID: 'diaz54ruben32978',
    mail: 'ruben@diaza.com',
    username: 'rubendiaz',
    password: '123123123'
}

const user2 = {
    name: 'Ricardo',
    surname: 'Tapia',
    userID: 'tapia67ricardo340956',
    mail: 'ricardo@tapia.com',
    username: 'rtapia',
    password: '123123123'
}

const user3 = {
    name: 'Edu',
    surname: 'hdz',
    userID: 'hdz56edu12052309',
    mail: 'edu@hdz.com',
    username: 'eduhdz',
    password: '123123123'
}

let usersJson = fs.readFileSync('./data/users.json')
users = JSON.parse(usersJson)

users.insertUser(user1)
users.insertUser(user2)
users.insertUser(user3)

console.log(users) // Before stringify

let usersJSON = JSON.stringify(users)

console.log('usersJSON', usersJSON)

fs.writeFileSync('./data/users.json', usersJSON)

const users_JSON = fs.readFileSync('./data/users.json', 'utf8')

console.log('users_JSON', usersJSON)

console.log('POSTS FROM USERS')

const posts = []

const post1 = {
    username: "rubendiaz",
    imgUrl: "",
    caption: "Hello",
    postDate: "2024-06-28T11:07:08.899Z",
    PostId: "postIdrubendiaz",
    favs: [],
    likes: []
}

const post2 = {
    username: "rtapia",
    imgUrl: "",
    caption: "World",
    postDate: "2024-06-21T11:07:08.899Z",
    PostId: "postIdrtapia",
    favs: [],
    likes: []
}

const post3 = {
    username: "eduhdz",
    imgUrl: "",
    caption: "Hello, World",
    postDate: "2024-06-22T11:07:08.899Z",
    PostId: "postIdeduhdz",
    favs: [],
    likes: []
}

console.log(post1)
console.log(post2)
console.log(post3)

posts.insertPost(post1)
posts.insertPost(post2)
posts.insertPost(post3)

posts = JSON.stringify(posts)

console.log(postsJSON)