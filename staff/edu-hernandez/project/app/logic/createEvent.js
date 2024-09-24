import { validate, errors } from 'com'

const { SystemError } = errors

export default (title, image, caption, time, location, date) => {
    validate.string(title, 'title')
    validate.url(image, 'image')
    validate.string(caption, 'caption')
    validate.time(time, 'time')
    validate.location(location, 'location')
    validate.date(date, 'date')

    return fetch(`${import.meta.env.VITE_API_URL}/events`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, image, caption, time, location, date })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            const { status } = response

            if (status === 201) return

            return response.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}
