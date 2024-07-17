import getAllPosts from './getAllPosts.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUser.js'
import getUserUsername from './getUserUsername.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import toggleLikePost from './toggleLikePost.js'
import updatePostCaption from './updatePostCaption.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import toggleFavPost from './toggleFavPost.js'
import getAllFavPosts from './getAllFavPosts.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllPoniesPosts from './getAllPoniesPosts.js'
import isUserLoggedIn from './isUserLoggedIn.js'

const logic = {
    authenticateUser,
    getAllPosts,
    getUserName,
    getUserUsername,
    logoutUser,
    registerUser,
    toggleLikePost,
    updatePostCaption,
    createPost,
    deletePost,
    toggleFavPost,
    getAllFavPosts,
    toggleFollowUser,
    getAllPoniesPosts,
    isUserLoggedIn
}

export default logic