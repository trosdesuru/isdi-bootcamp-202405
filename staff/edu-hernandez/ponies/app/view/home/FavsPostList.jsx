import './PostList.css'

import logic from "../../logic/index"

import { Component } from 'react'

import Post from './Post'

class FavsPostList extends Component {
    constructor() {
        console.debug('FavsPostList -> constructor')

        super()

        this.state = { posts: [] }
    }

    componentDidMount() {
        console.debug('FavPostList -> componentDidMount')

        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })

            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        console.debug('FavsPostList -> componentWillReceiveProps', newProps, this.props)

        if (newProps.refreshStamp !== this.props.refreshStamp)
            try {
                logic.getAllFavPosts((error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    this.setState({ posts })

                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handlePostDeleted() {
        console.debug('FavsPostList ->  handlePostDeleted')
        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })

            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostEdited() {
        console.debug('FavsPostList ->   handlePostEdited')
        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })

            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLikeToggled() {
        console.debug('FavsPostList ->   handlePostLikeToggled')
        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })

            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostFavToggled() {
        console.debug('FavsPostList -> handlePostFavToggled')
        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })

            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowToggled() {
        console.debug('FavsPostList -> handleUserFollowToggled')
        try {
            logic.getAllFavPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })

            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('FavsPostList -> render')

        return <section className="post-list">
            {this.state.posts.map(post =>
                <Post post={post}
                    key={post.id}
                    onPostDeleted={this.handlePostDeleted.bind(this)}
                    onPostEdited={this.handlePostEdited.bind(this)}
                    onPostLiked={this.handlePostLikeToggled.bind(this)}
                    onPostFavourited={this.handlePostFavToggled.bind(this)}
                    onUserFollowed={this.handleUserFollowToggled.bind(this)}
                />)}
        </section>
    }
}

export default FavsPostList