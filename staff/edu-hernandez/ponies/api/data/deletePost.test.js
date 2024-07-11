import deletePost from "./deletePost.js";

const posts = []

const post = {
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZno2a25uZzJpZDZ4aWJsMzBsdWJkbTg0NjZwczNoMnBnOTJrZjUxaSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/rObny7cK9tCHSpvGCU/giphy.gif",
    caption: "yija",
    alttext: "fight",
    postId: "kanj40hg08n09qqg+g3nigi0qg"
}

const post1 = {
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZno2a25uZzJpZDZ4aWJsMzBsdWJkbTg0NjZwczNoMnBnOTJrZjUxaSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/rObny7cK9tCHSpvGCU/giphy.gif",
    caption: "caption",
    alttext: "round",
    postId: "fknasjbihrhd3i3ujgi958ui"
}

const post2 = {
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZno2a25uZzJpZDZ4aWJsMzBsdWJkbTg0NjZwczNoMnBnOTJrZjUxaSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/rObny7cK9tCHSpvGCU/giphy.gif",
    caption: "caption",
    alttext: "round",
    postId: "45okglypefnihwkksv",
}

console.log(post2)


post.push(posts)
post1.push(posts)
post2.push(posts)



deletePost(post2)
