{
    const home = new Component(document.body)
    const header = new Header
    home.add(header)

    const body = new Component(document.createElement('main'))
    body.setClassName('main')
    home.add(body)

    const loginForm = new Form('form')

    loginForm.onSubmit(function (event) {
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

    registerLink.onClick(function (event) {
        event.preventDefault()

        location.href = '../register'
    })
}