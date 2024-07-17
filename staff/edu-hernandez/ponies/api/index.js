import express from 'express'

import logic from 'cor/logic/index.js'

const api = express()

api.get('/hello', (req, res) => {
    res.send('Hello, World!')
})

api.post('/users', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { name, surname, email, username, password, passwordRepeat } = JSON.parse(json)

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            res.setHeader('Content-Type', 'text/html')

            res.status(201).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

// POST Authentication path /users/auth
api.post('/users/auth', (req, res) => {
    req.setEncoding('utf-8')

    req.on('logic', json => {
        const { username, password } = JSON.parse(json)

        try {
            logic.authenticateUser(username, password)

            res.setHeader('Authorization', `Basic${username}`)

            res.status(200).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })
})

// GET /GetAllPosts/ using username & user.username
api.get('/users/:username/name', (req, res) => {
    req.setEncoding('utf-8')

    const { authorization } = req.headers // 

    if (!authorization || user.username !== author)
        throw new Error('not authorized')
    
    const author = authorization.split(' ')[1]

    try {
        const user = logic.getUser(author)


        const posts = logic.getAllPosts(user.username)

        res.status(200).send()
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

// GET /posts/ (getAllPosts) [Authorization: Basic username]
api.get('/posts', (req, res) => {
    req.setEncoding('utf8')

    const { authorization } = req.headers

    const user = logic.getUserName(username)

    const allPosts = logic.getAllPosts(username)

    try {

        if (!authorization || user.username !== authorization.split(' ')[1])
            throw new Error('not authorized')

        res.status(201).json(posts)
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message });
    }
});

// GET /posts/ponies (getAllPoniesPosts) [Authorization: Basic username]
api.get('/posts/ponies', (req, res) => {
    req.setEncoding('utf8')

    const { authorization } = req.headers

    const user = logic.getUserName(username)

    try {
        const posts = logic.getAllPoniesPosts(req.username)

        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
});

// // GET /posts/favs (getAllFavPosts) [Authorization: Basic username]
// api.get('/posts/favs', (req, res) => {
//     try {
//         const posts = logic.getAllFavPosts(req.username);
//         res.status(200).json({ posts });
//     } catch (error) {
//         res.status(500).json({ error: error.constructor.name, message: error.message });
//     }
// });

// // POST /posts (createPost) [Authorization: Basic username]
// api.post('/posts', (req, res) => {
//     const { content } = req.body;

//     try {
//         logic.createPost(req.username, content);
//         res.status(201).send();
//     } catch (error) {
//         res.status(500).json({ error: error.constructor.name, message: error.message });
//     }
// });

// // DELETE /posts/:postId (deletePost) [Authorization: Basic username]
// api.delete('/posts/:postId', (req, res) => {
//     const { postId } = req.params;

//     try {
//         logic.deletePost(req.username, postId);
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ error: error.constructor.name, message: error.message });
//     }
// });

// // PATCH /posts/:postId/likes (toggleLikePost) [Authorization: Basic username]
// api.patch('/posts/:postId/likes', basicAuth, (req, res) => {
//     const { postId } = req.params;

//     try {
//         logic.toggleLikePost(req.username, postId);
//         res.status(200).send();
//     } catch (error) {
//         res.status(500).json({ error: error.constructor.name, message: error.message });
//     }
// });
// TODO POST /users/auth (authenticateUser)
// TODO GET /users/:userId/name (getUserName) [Authorization: Basic username]
// TODO GET /posts (getAllPosts) [Authorization: Basic username]
// TODO GET /posts/ponies (getAllPoniesPosts) [Authorization: Basic username]
// TODO GET /posts/favs [Authorization: Basic username]
// TODO POST /posts (createPost) [Authorization: Basic username]
// TODO DELETE /posts/:postId (deletePost) [Authorization: Basic username]
// TODO PATCH /posts/:postId/likes (toggleLikePost) [Authorization: Basic username]


api.listen(8080, () => console.log('API is up'))