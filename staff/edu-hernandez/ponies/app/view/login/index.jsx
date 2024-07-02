import logic from '../../logic/index.mjs'

const Component = React.Component

class Login extends Component {
    constructor() {
        super()
    }

    handleRegisterClick(event) {
        event.preventDefault()

        location.href = '../register'
    }

    handleLoginSubmit(event) {
        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)

            location.href = '../home'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <main className="view">
            <div className="status-bar">statusbar
                <div className="left-side">leftside
                    <div className="time" id="current-time">time</div>
                </div>
                <div className="right-side">right
                    <div className="status-field">status
                        <div className="cobertura-icon">icon</div>
                        <div className="wifi-icon">icon</div>
                        <div className="battery-icon">icon</div>
                    </div>
                </div>
            </div>
            <h1>Login</h1>
            <form className="form" onSubmit={this.handleLoginSubmit}>
                <div className="form__field">
                    <label htmlFor="username-input">Username</label>
                    <input className="form__input" type="text" id="username-input" name="username" placeholder="username" />
                </div>

                <div className="form__field">
                    <label htmlFor="password-input">Password</label>
                    <input className="form__input" type="password" id="password-input" name="password" placeholder="password" />
                </div>

                <button className="form__button" type="submit">Login</button>
            </form>

            <a href="" onClick={this.handleRegisterClick}>Register</a>
        </main>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Login />)