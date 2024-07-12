import updatePost from "./updatePost.js"

const postUpdate = {
    username: "rubendiaz",
    imgUrl: "updatePost_imgUrlrubendiaz",
    caption: "Hello",
    postDate: "thursday/11/07/2024/15.45",
    id: "xdfgh46",
    favs: [],
    likes: []
}

updatePost(post => post.id === "xdfgh46", postUpdate)