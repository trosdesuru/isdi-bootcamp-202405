import 'dotenv/config.js'
import { validate } from 'com'
import { User } from '../data/models.js'
// import mongoose from 'mongoose' #not declared 'cause is not using
// to create an User

export default (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.password(passwordRepeat, 'passwordRepeat')
    validate.callback(callback)

    if (password !== passwordRepeat)
        throw new Error('passwords do not match')

    User.findOne({ email })
        .then(user => {
            if (user) {
                callback(new Error('user already exists'))

                return
            }

            User.findOne({ username })
                .then(user => {
                    if (user) {
                        callback(new Error('user already exists'))

                        return
                    }

                    const newUser = {
                        name,
                        surname,
                        email,
                        username,
                        password,
                        favs: [],
                        following: [],
                        avatar: ''
                    }

                    User.insertOne(newUser)
                        .then(() => callback(null))
                        .catch(error => callback(new Error(error.message)))
                })
                .catch(error => callback(new Error(error.message)))
        })
        .catch(error => callback(new Error(error.message)))
}