import fs from 'fs'

const post = {
    image: "image@url",
    caption: "caption",
    altText: "round",
    postId: "45okglypefnihwkksv",
    likes: []
}

const updatedPost = post.updatePost(posts => post.id === "45okglypefnihwkksv", post )

console.log()