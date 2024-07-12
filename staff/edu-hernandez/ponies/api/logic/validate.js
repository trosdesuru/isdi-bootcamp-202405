const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

function validateName(name, explain = 'name') {
    if(typeof name !== 'string') 
        throw new Error SyntaxError(`invalid ${name}`)
}

function validateObject(object, explain = 'object') {
    if (object === null || typeof object !== 'object')
}