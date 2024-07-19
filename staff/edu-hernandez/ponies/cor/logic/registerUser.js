import data from '../data/index.js'

const registerUser = (name, surname, email, username, password, /*passwordRepeat*/) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    // TODO passwordRepeat

    if (password !== passwordrepeat)
        throw new Error('passwords do not match')
    
    let user = data.findUser(user => user.email === email)

    if (user !== null)
        throw new Error('email already exists')

    user = data.findUser(user => user.username === username)

    if (user !== null)
        throw new Error('username already exists')

    user = {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password,
        favs: [],
        following: [],
        avatar: '../../img/flag.png'
    }

    data.insertUser(user)
}

export default registerUser