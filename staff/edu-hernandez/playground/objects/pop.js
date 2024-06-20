<<<<<<< HEAD
console.log('TEST POP')

console.log('CASE pop the last element from array')

cars.pop = function () {

    delete this[this.length - 1]
    this.length -= 1
    return this.length
}
cars.pop()

cars.pop = function () {
    var lastElement = this[this.length - 1]

    delete this[--this.length]//

    return lastElement
}

cars.pop()

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3
=======
console.log('TEST pop')

console.log('CASE pop the last element from object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3

cars.pop = function () {
    var element = this[this.length - 1]

    // delete this[this.length - 1]
    // this.length--
    delete this[--this.length]

    return element
}

var last = cars.pop()

console.log(cars)
// [{...}, {...}]
console.log(cars.length)
// 2

console.log(last)
// { brand: 'fiat', model: '500', year: 2017 }
>>>>>>> 804e4c522ff8404c95fc214063b0710cd047bd58
