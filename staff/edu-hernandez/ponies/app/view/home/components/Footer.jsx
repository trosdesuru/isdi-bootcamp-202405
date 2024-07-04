import logic from '../../../logic/index.mjs'

const Component = React.Component

class Footer extends Component {
    constructor() {
        super()
        this.state = { createPost: false }
    }

    handleCreatePostClick(event) {
        event.preventDefault()
        try {
            const createPost = logic.createPost()

            this.setState = { createPost: true }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <footer className="footer">
            <button className="Button" onClick={this.handleCreatePostClick}>Add Ponie</button>
        </footer>
    }
}

export default Footer