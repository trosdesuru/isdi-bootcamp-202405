<<<<<<< HEAD
console.log('TEST AT')

console.log('CASE element at index')

var numeros = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

console.log(numeros)
// { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }
console.log(numeros.length)
// 5

numeros.at = function (index) {
    if (index > -1)
        return this[index]
    else
        return this[this.length + index]

}

var num = numeros.at(3)

console.log(num)
// 130

var num = numeros.at(-3)

console.log(num)
// 8
=======
console.log('TEST at')

console.log('CASE element at index')

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

console.log(nums)
// [5, 12, 8, 130, 44]
console.log(nums.length)
// 5

nums.at = function (index) {
    //if (index >= 0)
    if (index > -1)
        return this[index]
    else
        return this[this.length + index]
}

var num = nums.at(3)

console.log(num)
// 130

var num = nums.at(0)

console.log(num)
// 5

var num = nums.at(-3)

console.log(num)
// 8

var num = nums.at(100)

console.log(num)
// undefined

var num = nums.at(-100)

console.log(num)
// undefined
>>>>>>> 804e4c522ff8404c95fc214063b0710cd047bd58
