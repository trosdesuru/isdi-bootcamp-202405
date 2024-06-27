{
    function findUSer(condition) {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

        const user = users.find(condition)

        return user || null
    }

    data.findUSer = findUSer
}