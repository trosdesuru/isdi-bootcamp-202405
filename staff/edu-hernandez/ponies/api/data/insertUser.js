import fs from 'fs'

function insertUser(user) {
    let json = fs.readSync('users.json', 'utf8')

    const users = json ? JSON.parse(json) : []
    
    users.push(user)

    json = JSON.stringify(users)
}

export default insertUser