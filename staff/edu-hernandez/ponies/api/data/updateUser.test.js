import updateUser from "./updateUser.js"

const user = {
    username: "Lucas",
    image: "https//:urlrandom.com",
    caption: "Hello, World",
    postDate: "11/07/2024",
    id: "numid20",
    favs: [],
    likes: []
}
updateUser(post => post.id === 'numid20', user)