import logic from '../../../logic/index.mjs'

const Component = React.Component

class Footer extends Component {
    constructor() {
        super()

        try {
            
        }

    }
        handleCreatePostClick() {
            try {
                const createPost = logic.createPost()

                this.state = { createPost }
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