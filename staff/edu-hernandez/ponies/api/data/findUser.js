import fs from 'fs'

function findUser(condition) {
    const json = fs.readFileSync('./data/users.json')

    const users = json ? JSON.parse(json) : []

    const user = users.find(condition)

    return user || null
}

export default findUser