// GET /GetAllPosts/ using username & user.username
api.get('/users/:username/name', (req, res) => {
    req.setEncoding('utf-8')

    const { authorization } = req.headers // 

    const author = authorization.split(' ')[1]

    const user = logic.getUser(author)

    if (!authorization || user.username !== author)
        throw new Error('not authorized')

    try {

        const posts = logic.getAllPosts(user.username)

        res.status(200).send()
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})