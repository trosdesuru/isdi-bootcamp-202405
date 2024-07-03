import logic from '../../logic/index.mjs'

import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer.jsx'

const Component = React.Component

class Home extends Component {
    constructor() {
        super()

        try {
            const posts = logic.getAllPosts()

            this.state = { posts }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleLogoutClick() {
        try {
            logic.logoutUser()

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleHomeButton() {

    }

    render() {
        return <>
            <Header />

            <main className="view main">
                <PostList />
            </main>
            <footer className="footer">
            <button className="form-button">
                Add Ponie
            </button>
        </footer>
        </>
    }


}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)