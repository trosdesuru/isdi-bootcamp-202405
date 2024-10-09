function getRandomEvents(events, n) {
    // console.debug('getRandomEvents -> call')

    if (typeof n !== 'number' || n < 1) {
        throw new Error('n must be an integer greater than 0')
    }

    const shuffled = [...events]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled.slice(0, Math.min(n, shuffled.length))
}

export default getRandomEvents