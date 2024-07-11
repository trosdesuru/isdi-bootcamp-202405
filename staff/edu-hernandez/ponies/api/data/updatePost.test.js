import updatePost from "./updatePost.json"

const post = {
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZno2a25uZzJpZDZ4aWJsMzBsdWJkbTg0NjZwczNoMnBnOTJrZjUxaSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/rObny7cK9tCHSpvGCU/giphy.gif",
    caption: "caption",
    alttext: "round",
    postId: "45okglypefnihwkksv",
    likes: []
}

const updatedPost = post.updatePost(posts => post.id === "45okglypefnihwkksv", post )

console.log()