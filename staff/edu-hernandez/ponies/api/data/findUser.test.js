import findUser from "./findUser.js"

const bruce = {
    name: "Bruce",
    surname: "Wayne",
    email: "bruce@wayne.com",
    username: "brucewayne",
    password: "123123123"
}

const userFound = findUser(user => user.username === 'brucewayne')