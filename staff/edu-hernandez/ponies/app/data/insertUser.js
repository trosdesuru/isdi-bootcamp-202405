{
    function insertUser(user) {
        const user = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

        users.push(user)

        localStorage.users = JSON.stringify(users)
    }

    data.insertUser = insertUser
}