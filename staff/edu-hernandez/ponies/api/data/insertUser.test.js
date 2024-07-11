import insertUser from './insertUser'

console.info('TEST insertUser')

const user = {
    name: 'Manu',
    surname: 'Guix',
    userID: 'guix56manu12052309',
    mail: 'manu@guix.com',
    username: 'manuguix',
    password: '123123123'
}

insertUser(user)