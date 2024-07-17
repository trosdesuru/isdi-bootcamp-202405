const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
const USERNAME_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/

function validateString(value, explain = 'value') {
    if (typeof value != 'string') 
        throw new TypeError(`${explain} is not a string`)
}

function validateCallback(callback, explain = 'Callback') {
    if (typeof callback !== 'function') 
        throw new TypeError(`${explain} is not a function`)
}

function validateObject(object, explain = 'Object') {
    if (object === null || typeof object !== 'object' || object.constructor !== Object)
        throw new TypeError(`${explain} is not an Object`)
}

function validateUsername(username) {
    validateString(username, 'username')
    if (!USERNAME_REGEX.test(username)) 
        throw new SyntaxError('invalid username')
}

function validatePassword(password) {
    validateString(password, '')
    if (password.trim().length < 8) 
        throw new RangeError('Password length is lover than 8 characters')

    if (password.includes(' ')) 
        throw new SyntaxError('Password has empty spaces')
}

function validateName(name, explain = 'name') {
    validateString(name, explain)
    if (!NAME_REGEX.test(name)) 
        throw new SyntaxError(`invalid ${explain}`)
}

function validateEmail(email) {
    validateString(email, 'email')
    if (!EMAIL_REGEX.test(email)) 
        throw new SyntaxError('invalid email')
}

function validateImage(image, explain = 'image') {
    validateString(image, 'image')
    if (!image.startsWith('http')) 
        throw new SyntaxError(`invalid ${explain}`)
}

function validatePostId(postId) {
    validateString(postId, 'PostId')
    if (postId.trim().length === 0) 
        throw new Error('invalid postId')
}

const validate = {
    string: validateString,
    callback: validateCallback,
    object: validateObject,
    username: validateUsername,
    password: validatePassword,
    username: validateName,
    email: validateEmail,
    image: validateImage,
    postId: validatePostId

}

export default validate