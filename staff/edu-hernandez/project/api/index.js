import 'dotenv/config'
import express from 'express'

import { mongoose } from 'cor'

import { cors, jsonBodyParser, jwtVerifier, errorHandler } from './middlewares/index.js'
import {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    getAllEventsHandler,
    getAllUserEventsHandler,
    getAllFavEventsHandler,
    getAllRecommendedEventsHandler,
    createEventHandler,
    deleteEventHandler,
    toggleGoingEventHandler,
    toggleFavEventHandler,
    toggleFollowUserHandler,
    updateEventCaptionHandler,
    searchEventHandler,
    createReviewHandler
    
} from './handlers/index.js'

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.info(`API connected to ${process.env.MONGODB_URI}`)

        const api = express()

        api.use(cors)

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/:targetUserId/name', jwtVerifier, getUserNameHandler)

        api.get('/events', jwtVerifier, getAllEventsHandler)

        api.get('/events/users', jwtVerifier, getAllUserEventsHandler)

        api.get('/events/fav', jwtVerifier, getAllFavEventsHandler)

        api.get('events/recommended', jwtVerifier, getAllRecommendedEventsHandler)

        api.post('/events', jwtVerifier, jsonBodyParser, createEventHandler)

        api.post('events/reviews', jwtVerifier, jsonBodyParser, createReviewHandler)

        api.delete('/events/:eventId', jwtVerifier, deleteEventHandler)

        api.patch('/events/:eventId/going', jwtVerifier, toggleGoingEventHandler)

        api.patch('/events/:eventId/favs', jwtVerifier, toggleFavEventHandler)

        api.patch('/users/:targetUserId/follows', jwtVerifier, toggleFollowUserHandler)

        api.patch('/events/:eventId/caption', jwtVerifier, jsonBodyParser, updateEventCaptionHandler)

        api.get('/events/search', jwtVerifier, searchEventHandler)

        api.use(errorHandler)

        api.listen(process.env.PORT, () => console.info(`API listening on PORT ${process.env.PORT}`))
    })
    .catch(error => console.error(error))