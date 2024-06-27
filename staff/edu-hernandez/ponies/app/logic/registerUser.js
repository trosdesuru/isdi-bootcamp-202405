{
    const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

    const registerUser = (
        name,
        surname,
        email,
        username,
        password,
        passwordRepeat) => {

        if (name.trim() === '')
            throw new Error('invalid name')

        if (surname.trim().length < 2)
            throw new Error('invalid surname')

        if (!EMAIL_REGEX.test(email))
            throw new Error('invalid email')

        if (username.trim().length < 4)
            throw new Error('invalid username')

        if (password.trim().length < 8)
            throw new Error('invalid password')

        if (password !== passwordRepeat)
            throw new Error('passwords do not match')

        let users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

        let user = users.find(function (user) {
            return user.email === email
        })

        if (user !== undefined)
            throw new Error('email already exists')

        const user = users.find(function (user) {
            return user.username === username
        })

        if (user !== undefined)
            throw new Error('username already exists')

        user = {
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password
        }

        data.inserUser(user)
    }

    logic.registerUser = registerUser
}