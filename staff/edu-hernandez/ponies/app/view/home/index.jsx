import Header from './components/Header'
import Footer from './components/Footer.jsx'

import PostList from './components/PostList'

const Component = React.Component

class Home extends Component {
    constructor() {
        console.debug('Home -> constructor')

        super()

        this.state = { refreshStamp: null }
    }

    handlePostCreated() {
        console.debug('Home -> handlePostCreated')

        this.setState({ refreshStamp: Date.now() })
    }

    render() {
        console.debug('Home -> render')
        
        return <>
            <Header />

            <main className="view main">
                <PostList refreshStamp={this.state.refreshStamp} />
            </main>

            <Footer onPostCreated={this.handlePostCreated.bind(this)} />
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)