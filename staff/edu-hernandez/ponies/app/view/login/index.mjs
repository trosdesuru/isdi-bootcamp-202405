import Form from '../components/Form.mjs'
import Link from '../components/Link.mjs'

import logic from '../../logic/index.mjs'
import updateTime from '../../util/updateTime.mjs'


const time = updateTime()

const loginForm = new Form('form')

loginForm.onSubmit(event => {
    event.preventDefault()

    const usernameInput = document.getElementById('username-input')
    const passwordInput = document.getElementById('password-input')

    const username = usernameInput.value
    const password = passwordInput.value

    try {
        logic.loginUser(username, password)

        location.href = '../home'
    } catch (error) {
        alert(error.message)
    }
})

const registerLink = new Link('a')
registerLink.setClassName('form__button-register')

registerLink.onClick(function (event) {
    event.preventDefault()

    location.href = '../register'
})