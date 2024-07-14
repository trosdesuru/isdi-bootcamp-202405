import logic from '../../logic/index'

import formatTime from '../../util/formatTime'

import { Component } from 'react'

import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'
import Form from '../components/Form'
import Time from '../components/Time'
import Image from '../components/Image'
import Paragraph from '../components/Paragraph'
import Heading from '../components/Heading'
import Container from '../components/Container'

import './Post.css'


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

        return <article className="Post">
            <Container className='Container--row--spacebetween'>
                <Heading level="3">{post.author.username}</Heading>
                {/* <Avatar></Avatar> */}

                <Button className="Button--follow" onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? 'Unfollow' : 'Follow'}</Button>
            </Container>

            <Image className='post--image' src={post.image} alt={post.caption} title={post.caption} />

            <Container className='Container--row--between'>
                <Button className="Button--like" onClick={this.handleLikeClick.bind(this)}>{(post.like ? '♥️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
                <Button className="Button--adfav" onClick={this.handleFavClick.bind(this)}>{post.fav ? 'Unfav' : 'Add fav'}</Button>
            </Container>

            <Paragraph className="Paragraph--post__caption">{post.caption}</Paragraph>

            <Container>
                <Time className='Time'>{formatTime(new Date(post.date))}</Time>
            </Container>

            <Container className='Container--row'>
                {post.author.username === logic.getUserUsername() && <>
                    <Button className='Button--edit'
                        onClick={this.handleEditPostClick.bind(this)}>Edit</Button>
                    <Button className='Button--delete'
                    onClick={this.handleDeletePostClick.bind(this)}>Delete</Button>
                </>}
            </Container>


            {this.state.editPostVisible && <Form onSubmit={this.handleEditpostSubmit.bind(this)}>
                <Label for="edit-caption-input"></Label>
                <Input id="edit-caption-input" defaultValue={post.caption} />

                <Button type="submit">Save</Button>
                <Button type="button" onClick={this.handleCancelEditPostClick.bind(this)}>Cancel</Button>
            </Form>}
        </article >
    }
}

export default Post