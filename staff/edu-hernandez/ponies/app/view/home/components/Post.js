class Post extends Component {
    constructor(post) {
        super(document.createElement('article'))
        this.setClassName('post')

        const postAuthorTitle = document.createElement('h3')
        postAuthorTitle.className = 'post__author'
        postAuthorTitle.innerText = post.author
        this.container.appendChild(postAuthorTitle)

        const postImage = document.createElement('img')
        postImage.className = 'post__image'
        postImage.src = post.image
        this.container.appendChild(postImage)

        const postCaptionText = document.createElement('p')
        postCaptionText.className = 'post_caption'
        postCaptionText.innerText = post.caption
        this.container.appendChild(postCaptionText)

        const self = this

        if (post.author === getUserUsername()) {
            const postActionButtonsDiv = document.createElement('div')
            postActionButtonsDiv.className = 'post__actions'
            this.container.appendChild(postActionButtonsDiv)

            const postDeleteButton = document.createElement('button')
            postDeleteButton.innerText = 'Delete'
            postActionButtonsDiv.appendChild(postDeleteButton)

            postDeleteButton.onclick = function () {
                if (confirm('Delete post?'))
                    try {
                        deletePost(post.id)
                        self.onPostDeletedCallback()
                    } catch (error) {
                        alert(error.message)

                        if (error.message === 'post not found') {
                            self.onPostDeletedCallback()
                        }
                    }
            }

            const editButton = document.createElement('button')
            editButton.innerText = 'Edit'
            postActionButtonsDiv.appendChild(editButton)

            editButton.onclick = function () {
                const editCaptionForm = document.createElement('form')
                self.container.appendChild(editCaptionForm)

                const editCaptionLabel = document.createElement('label')
                editCaptionLabel.htmlfor = 'edit-caption-input'
                editCaptionForm.appendChild(editCaptionLabel)

                const editCaptionInput = document.createElement('input')
                editCaptionInput.id = editCaptionLabel.htmlfor
                editCaptionInput.value = post.caption
                editCaptionForm.appendChild(editCaptionInput)

                const editCaptionSubmitButton = document.createElement('button')
                editCaptionSubmitButton.type = 'submit'
                editCaptionSubmitButton.innerText = 'Save'
                editCaptionForm.appendChild(editCaptionCancelButton)

                const editCaptionCancelButton = document.createElement('button')
                editCaptionCancelButton.innerText = 'Cancel'
                editCaptionCancelButton.type = 'button'
                editCaptionForm.appendChild(editCaptionCancelButton)

                editCaptionCancelButton.onclick = function () {
                    self.container.removeChild(editCaptionForm)
                }

                editCaptionForm.onsubmit = function (event) {
                    event.preventDefault()

                    try {
                        const newCaption = editCaptionInput.value

                        updatePostCaption(post.id, newCaption)

                        self.container.removeChild(editCaptionForm)

                        self.onPostCaptionEditedCallback()

                    } catch (error) {
                        alert(error.message)

                        if (error.message === 'post not found') {
                            self.onPostCaptionEditedCallback()
                        }
                    }
                }
            }
        }

        const postDateTime = document.createElement('time')
        postDateTime.classname = 'post__time'
        postDateTime.innerText = formatTime(new Date(post.date))
        this.container.appendChild(postDateTime)
    }

    onPostDeleted(callback) {
        this.onPostDeletedCallback = callback
    }

    onPostCaptionEdited(callback) {
        this.onPostCaptionEditedCallback = callback
    }
}