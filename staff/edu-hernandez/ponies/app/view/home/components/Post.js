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

        //  <><><>-- ICON SECTION --<><><>
        const iconSection = new Component(document.createElement('section'))
        iconSection.setClassName('icon_section')
        this.add(iconSection)

        // <><><>-- HEART ICON --<><><>
        const likeButton = new Button
        likeButton.setClassName('likeButton')
        iconSection.add(likeButton)

        const likeIcon = new Image
        likeIcon.setClassName('likeIcon')
        likeIcon.setUrl('https://cdn.icon-icons.com/icons2/931/PNG/512/heart_love_fav_favourite_icon-icons.com_72394.png')
        likeButton.add(likeIcon)

        const postCaptionText = new Paragraph
        postCaptionText.setClassName('post_caption')
        postCaptionText.setText(post.caption)
        this.add(postCaptionText)

        const postDateTime = document.createElement('time')
        postDateTime.classname = 'post__time'
        postDateTime.innerText = formatTime(new Date(post.date))
        this.container.appendChild(postDateTime)

        const self = this

        if (post.author === logic.getUserUsername()) {
            const postActionButtonsDiv = new Component(document.createElement('div'))
            postActionButtonsDiv.setClassName('post__actions')
            this.add(postActionButtonsDiv)

            const postDeleteButton = new Button
            postDeleteButton.setText('Delete')
            postActionButtonsDiv.add(postDeleteButton)

            postDeleteButton.onClick(function () {
                if (confirm('Delete post?'))
                    try {
                        logic.deletePost(post.id)
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

                const editCaptionLabel = new Label
                editCaptionLabel.setFor('edit-caption-input')
                editCaptionForm.add(editCaptionLabel)

                const editCaptionInput = new Input
                editCaptionInput.id = editCaptionLabel.setFor()
                editCaptionInput.setValue(post.caption)
                editCaptionForm.add(editCaptionInput)

                const editCaptionSubmitButton = new Button
                editCaptionSubmitButton.setType('submit')
                editCaptionSubmitButton.setText('Save')
                editCaptionForm.add(editCaptionCancelButton)

                const editCaptionCancelButton = new Button
                editCaptionCancelButton.setText('Cancel')
                editCaptionCancelButton.setType('button')
                editCaptionForm.add(editCaptionCancelButton)

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
    }

    onPostDeleted(callback) {
        this.onPostDeletedCallback = callback
    }

    onPostCaptionEdited(callback) {
        this.onPostCaptionEditedCallback = callback
    }
}