import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer.jsx'

const Component = React.Component

class Home extends Component {
    constructor() {
        console.debug('Home -> constructor')

        super()
    }

    render() {
        console.debug('Home -> render')
        return <>
            <Header />

            <main className="view main">
                <PostList />
            </main>

            <Footer />
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)