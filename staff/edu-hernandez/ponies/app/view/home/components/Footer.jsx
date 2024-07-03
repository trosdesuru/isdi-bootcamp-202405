import logic from '../../../logic'

const { Component } = React

class Footer extends Component {
    constructor() {
        super()

        try {
            const createPost = logic.createPost()

            this.state = { createPost }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleAddPost() {
        try {
            logic.createPost()

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <footer class="footer">
            <button class="Button" onClick={this.handlecreatePost}>Add Ponie</button>
        </footer>
    }
}

export default Footer