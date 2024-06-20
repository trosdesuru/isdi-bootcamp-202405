<<<<<<< HEAD
console.log('TEST INDEXOF')

console.log('CASE indexOf in array')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison']

console.log(animals)
// ['ant', 'bison', 'camel', 'duck', 'bison']
console.log(animals.length)
// 5

console.log(animals.indexOf('ant'))
// 0
console.log(animals.indexOf('bison'))
// 1
console.log(animals.indexOf('camel', 1))
// 2
console.log(animals.indexOf('giraffa'))
// -1
console.log(animals.indexOf('ant', -5))
// 0
console.log(animals.indexOf('bison', 2))
//4
=======
console.log('TEST indexOf')

console.log('CASE index of animal in array')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison']

console.log(beasts)
// ['ant', 'bison', 'camel', 'duck', 'bison']

var index = beasts.indexOf('camel')

console.log(index)
// 2
console.assert(index === 2, 'index is 2')

var index = beasts.indexOf('bison')

console.log(index)
// 1
console.assert(index === 1, 'index is 1')

var index = beasts.indexOf('elephant')

console.log(index)
// -1
console.assert(index === -1, 'index is -1')

console.log('CASE index of animal in array from index')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison']

console.log(beasts)
// ['ant', 'bison', 'camel', 'duck', 'bison']

var index = beasts.indexOf('bison', 3)

console.log(index)
// 4
console.assert(index === 4, 'index is 4')

var index = beasts.indexOf('duck', -4)

console.log(index)
// 3
console.assert(index === 3, 'index is 3')

var index = beasts.indexOf('duck', -1)

console.log(index)
// -1
console.assert(index === -1, 'index is -1')

var index = beasts.indexOf('duck', -100)

console.log(index)
// 3
console.assert(index === 3, 'index is 3')

var index = beasts.indexOf('bison')

console.log(index)
// 1
console.assert(index === 1, 'index is 1')
>>>>>>> 804e4c522ff8404c95fc214063b0710cd047bd58
