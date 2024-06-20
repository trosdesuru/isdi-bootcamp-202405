<<<<<<< HEAD
console.log('TEST PUSH')
=======
<<<<<<< HEAD
console.log('CASE push and element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990}
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010}
cars[2] = { brand: 'fiat', model: '500', year: 2017}
cars.length = 3

console.log(cars)
// { brand: 'ferrari', model: 'gto', year: 1990}
// { brand: 'lamborghini', model: 'murcielago', year: 2010}
// { brand: 'fiat', model: '500', year: 2017}

console.log(cars.length)
// 3

cars.push = function(element) {
    // TODO add element into 'this' object (cars)
    this[this.length] = element;

    this.length++;
    
    return this.length;
    // return ++this.length
};

var count = cars.push({ brand: 'Ford', model: 'fiesta', year: 2005}))

console.log(cars)
// { brand: 'ferrari', model: 'gto', year: 1990 },
// { brand: 'lamborghini', model: 'murcielago', year: 2010 },
// { brand: 'fiat', model: '500', year: 2017 }
// { brand: 'Ford', model: 'fiesta', year: 2005}

console.log(cars.length)
// 4
=======
console.log('TEST push')
>>>>>>> 804e4c522ff8404c95fc214063b0710cd047bd58

console.log('CASE push an element to object')

var cars = new Object

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
<<<<<<< HEAD
cars[1] = { brand: 'lamborgini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiesta', model: '500', year: 2017 }
=======
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
//cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars['2'] = { brand: 'fiat', model: '500', year: 2017 }
>>>>>>> 804e4c522ff8404c95fc214063b0710cd047bd58
cars.length = 3

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, length: 3 }
console.log(cars.length)
// 3

<<<<<<< HEAD
/*cars.push = function (element) {
    
    this[3] = element
    this.length += 1
    delete this.push
    return this
}*/

cars.push = function (element) {

    this[this.length] = element
    this.length++ //no return
}


cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })
=======
//cars.push = function (element) {
cars['push'] = function (element) {
    // TODO add element into `this` object (cars)
    //this[this.length] = element
    this[this.length++] = element

    // this.length = this.length + 1
    //this.length++
    return this.length
    //return this.length++ // WARN
    // return ++this.length
}

//var count = cars.push({ brand: 'ford', model: 'fiesta', year: 2005 })
var count = cars['push']({ brand: 'ford', model: 'fiesta', year: 2005 })
>>>>>>> 804e4c522ff8404c95fc214063b0710cd047bd58

console.log(cars)
// { 0: {...}, 1: {...}, 2: {...}, 3: {...}, length: 4 }
console.log(cars.length)
// 4
<<<<<<< HEAD

console.log('CASE push many elements from object')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 7 }

console.log(animals)
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 7 }
console.log(animals.length)
// 4

/*animlas.push = function(element1, element2, element3) {
    this[this.length++] = element1
    this[this.length++] = element2
    this[this.length++] = element3
    return this.length
    
}*/

animals.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[this.length++] = argument
    }
    return this.length
}

var count = animals.push('chicken', 'cats', 'dogs')

console.log(animals)
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'chicken', 5: 'cats', 6: 'dogs', length: 7 }
console.log(animals.length)
// 7
console.log(count)
// 7
=======
console.log(count)
// 4

console.log('CASE push multiple elements to object')

var animals = { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', length: 4 }

console.log(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.log(animals.length)
// 4

// animals.push = function (element1, element2, element3) {
//     this[this.length++] = element1
//     this[this.length++] = element2
//     this[this.length++] = element3

//     return this.length
// }

animals.push = function () {
    for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index]

        this[this.length++] = argument
    }

    return this.length
}

var count = animals.push('chickens', 'cats', 'dogs')

console.log(animals)
// { 0: 'pigs', 1: 'goats', 2: 'sheep', 3: 'cows', 4: 'chickens', 5: 'cats', 6: 'dogs', length: 7 } 
console.log(animals.length)
// 7
console.log(count)
// 7
>>>>>>> 08b1ada5a17a839d33b942755b256e124649b9b6
>>>>>>> 804e4c522ff8404c95fc214063b0710cd047bd58
