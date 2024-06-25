class Post extends Component {
    constructor(post) {
        super(document.createElement('article'))
        this.setClassName('post')

        const postAuthorTitle = new Heading(3)
        postAuthorTitle.setClassName('post__author')
        postAuthorTitle.setText(post.author)
        this.add(postAuthorTitle)

        const postImage = new Image
        postImage.setClassName('post__image')
        postImage.setUrl(post.image)
        this.add(postImage)

        const postCaptionText = new Paragraph
        postCaptionText.setClassName('post_caption')
        postCaptionText.setText(post.caption)
        this.add(postCaptionText)

        const self = this

        if (post.author === getUserUsername()) {
            const postActionButtonsDiv = new Component(document.createElement('div'))
            postActionButtonsDiv.setClassName('post__actions')
            this.add(postActionButtonsDiv)

            const postDeleteButton = new Button
            postDeleteButton.setText('Delete')
            postActionButtonsDiv.add(postDeleteButton)

            postDeleteButton.onClick(function () {
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
            })

            const editButton = new Button
            editButton.setText('Edit')
            postActionButtonsDiv.add(editButton)

            editButton.onClick(function () {
                const editCaptionForm = new Form
                self.add(editCaptionForm)

                const editCaptionLabel = document.createElement('label')
                editCaptionLabel.htmlfor = 'edit-caption-input'
                editCaptionForm.container.appendChild(editCaptionLabel)

                const editCaptionInput = document.createElement('input')
                editCaptionInput.id = editCaptionLabel.htmlfor
                editCaptionInput.value = post.caption
                editCaptionForm.container.appendChild(editCaptionInput)

                const editCaptionSubmitButton = document.createElement('button')
                editCaptionSubmitButton.type = 'submit'
                editCaptionSubmitButton.innerText = 'Save'
                editCaptionForm.container.appendChild(editCaptionCancelButton)

                const editCaptionCancelButton = document.createElement('button')
                editCaptionCancelButton.innerText = 'Cancel'
                editCaptionCancelButton.type = 'button'
                editCaptionForm.container.appendChild(editCaptionCancelButton)

                editCaptionCancelButton.onClick = function () {
                    self.remove(editCaptionForm)
                }

                editCaptionForm.onSubmit(function (event) {
                    event.preventDefault()

                    try {
                        const newCaption = editCaptionInput.value

                        updatePostCaption(post.id, newCaption)

                        self.remove(updateCaptionForm)

                        self.onPostCaptionEditedCallback()
                    } catch (error) {
                        alert(error.message)

                        if (error.message === 'post not found') {
                            self.onPostCaptionEditedCallback()
                        }
                    }
                })
            })
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