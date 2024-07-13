import logic from '../logic/index'

import Heading from './components/Heading'
import Paragraph from './components/Paragraph'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Container from './components/Container'
import Link from './components/Link'
import Button from './components/Button'

function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

    const handleLoginSubmit = event => {
        console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)

            onLogin()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        console.debug('Login -> handleRegisterClick')

        event.preventDefault()

        onRegisterClick()
    }

    return <main className="view">
        <Container className='Container--center'>
            <Heading level="1">Login</Heading>
        </Container>

        <Form onSubmit={handleLoginSubmit}>
            <Container className="Container--column">
                <Label htmlFor="username-input">Username</Label>
                <Input type="text" id="username-input" name="username" placeholder="username" />
            </Container>

            <Container className="Container--column">
                <Label htmlFor="password-input">Password</Label>
                <Input type="password" id="password-input" name="password" placeholder="password" />
            </Container>

            <Container className='Container--right'>
                <Paragraph>Forgot your password?</Paragraph>
            </Container>

            <Button className="Button" type="submit">Login</Button>

            <Button className="Button">
                <Link onClick={handleRegisterClick}>Register</Link>
            </Button>

            <Container className='Container--center'>
                <Paragraph>or Login with</Paragraph>
            </Container>

            <Container className='Container--center'>
                <img className="Social-network" src="img/icon set/social media.png" alt="social-network" />
            </Container>
        </Form>
    </main>

}

export default Login