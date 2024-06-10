console.info('TEST map')

console.info('CASE map numbers to each one miltiplied by 2')

var nums = [1, 4, 9, 16]

var numsby2 = nums.map(funtion (num) { return num * 2 })

console.assert(numsby2 instanceof Array, 'numsBy2 is an Array')
console.assert(numsby2[0] === 2, 'numsBy2 at 0 is 2')
console.assert(numsby2[1] === 8, 'numsBy2 at 1 is 8')
console.assert(numsby2[2] === 18, 'numsBy2 at 2 is 18')
console.assert(numsby2[3] === 32, 'numsBy2 at 3 is 32')

console.info('CASE maps cart items to string with stats')

var cart = [
    
]