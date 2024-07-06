import logic from '../../../logic/index.mjs'
import data from '../../../logic/index.mjs'

import formatTime from '../../../util/formatTime.mjs'

const { Component } = React

class Post extends Component {
    constructor() {
        console.debug('Post -> constructor')

        super()

        this.state = { editPostVisible: false }
    }

    handleDeletePostClick() {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(this.props.post.id)

                this.props.onPostDeleted()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    componentWillUnmount() {
        console.debug('Post -> componentWillUnmount')
    }

    handleEditPostClick() {
        console.debug('Post -> handleEditPost')

        this.setState({ editPostVisible: true })
    }

    handleCancelEditPostClick() {
        console.debug('Post -> handleCancelEditPostClick')

        this.setState({ editPostVisible: false })
    }

    handleEditpostSubmit(event) {
        console.debug('Post -> handleCancelEditPostClick')

        event.preventDefault()

        const form = event.target

        const editCaptionInput = form['edit-caption-input']

        const newCaption = editCaptionInput.value

        try {
            logic.updatePostCaption(this.props.post.id, newCaption)

            this.setState({ editPostVisible: false })

            this.props.onPostEdited()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }
    handleLikeClick() {
        console.debug('Post -> handleLikeClick')

        try {
            logic.toggleLikePost(this.props.post.id)

            this.props.onPostLiked()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFavClick() {
        console.debug('Post -> handleFavClick')
        try {
            logic.toggleFavPost(this.props.post.id)

            this.props.onPostFavourited()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowUserClick() {
        console.debug('Header -> handleFollowUserClick')
        try {
            logic.toggleFollowUser(this.props.post.author.username)

            this.props.onUserFollowed()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Post -> render')

        const { post } = this.props

        return <article className="post">
            <div className="post__top">
                <h3 className="post__author">{post.author.username}</h3>

                {post.author.username !== logic.getUserUsername() &&
                    <><button className="follow__button"
                        onClick={this.handleFollowUserClick.bind(this)}>
                        {post.author.following ? 'Unfollow' : 'Follow'}
                    </button>
                    </>}
            </div>

            <img className="post__image" src={post.image} />
            <div className="div__sub-post">
                <div className="post__actions">
                    <button className="like__button"
                        onClick={this.handleLikeClick.bind(this)}>
                        {(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}
                    </button>
                    <button className="Button"
                        onClick={this.handleFavClick.bind(this)}>
                        {post.fav ? 'Unfav' : 'Add fav'}
                    </button>
                </div>
                <div><p className="post__caption">{post.caption}</p></div>

                {post.author.username === logic.getUserUsername() && <>
                    <button className="Button"
                        onClick={this.handleDeletePostClick.bind(this)}>
                        Delete
                    </button>
                    <button className="Button"
                        onClick={this.handleEditPostClick.bind(this)}>
                        Edit
                    </button>
                </>}

                <time className="post__time">{formatTime(new Date(post.date))}</time>
            </div>

            {this.state.editPostVisible && <form onSubmit={this.handleEditpostSubmit.bind(this)}>
                <label for="edit-caption-input"></label>
                <input id="edit-caption-input" defaultValue={post.caption} />

                <button class="Button" type="submit">Save</button>
                <button class="Button" type="button" onClick={this.handleCancelEditPostClick.bind(this)}>Cancel</button>
            </form>}
        </article>
    }
}

export default Post