import findUser from "./findUser.js"

const bruce = {
    name: "Bruno",
    surname: "Diaz",
    email: "bruno@diaz.com",
    username: "brunodiaz",
    password: "123123123"
}

const userFound = findUser(user => user.username === 'brunodiaz')