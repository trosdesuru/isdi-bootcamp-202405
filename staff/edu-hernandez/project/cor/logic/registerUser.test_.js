import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'
import { User } from '../data/models.js'

mongoose.connect(process.env.MONGODB_URI)
        .then(() => registerUser(
                'Bruno',
                'Diaz',
                'user',
                'bruno@diaz.com',
                'brunodiaz',
                '123123123',
                '123123123'
        ))
        .then(() => console.log('user registered'))
        .catch(error => console.error(error))

        .then(() => registerUser(
                'Peter',
                'Parker',
                'peter@parker.com',
                'peterparker',
                '123123123',
                '123123123'
        ))
        .then(() => console.log('user registered'))
        .catch(error => console.error(error))

        .then(() => registerUser(
                'Charlie',
                'Brown',
                'charlie@brown.com',
                'charlie',
                '123123123',
                '123123123'
        ))
        .then(() => console.log('user registered'))
        .catch(error => console.error(error))

        .then(() => registerUser(
                'Bruce',
                'Wayne',
                'bruce@wayne.com',
                'brucewayne',
                '123123123',
                '123123123'
        ))
        .then(() => console.log('user registered'))
        .catch(error => console.error(error))


        .then(() => registerUser(
                'Ricardo',
                'Tapia',
                'ricardo@tapia.com',
                'ricardotapia',
                '123123123',
                '123123123'
        ))
        .then(() => console.log('user registered'))
        .catch(error => console.error(error))

        .then(() => User.create({
                name: 'Mary',
                surname: 'Jane',
                role: 'user',
                email: 'mary@jane.com',
                username: 'lamary',
                password: '123123123',
                repeatPassword: '123123123'
        }))
        .then(() => console.log('user registered'))
        .catch(error => console.error(error))

        // .then(() => User.deleteMany())
        // .then(() => console.log('users deleted'))
        .finally(() => mongoose.disconnect())