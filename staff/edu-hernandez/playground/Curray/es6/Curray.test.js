const Curray = require('./Curray')

console.info('TEST Curray.prototype.concat')

console.info('CASE concatenate two Curray instances')

{
    const nums1 = new Curray(1, 2, 3)
    const nums2 = new Curray(4, 5, 6)

    const result = nums1.concat(nums2)

    console.assert(result.length === 6, 'result length is 6')
    console.assert(result[3] === 4, 'result[3] is 4')
    console.assert(result[5] === 6, 'result[5] is 6')
}

console.info('CASE concatenate with empty Curray')

{
    const nums1 = new Curray(1, 2, 3)
    const nums2 = new Curray()

    const result = nums1.concat(nums2)

    console.assert(result.length === 3, 'result length is 3')
    console.assert(result[2] === 3, 'result[2] is 3')
}

console.info('TEST Curray.prototype.copyWithin')

console.info('CASE copy within without end parameter')

{
    const nums = new Curray(1, 2, 3, 4, 5)
    
    nums.copyWithin(0, 3)

    console.assert(nums[0] === 4, 'nums[0] is 4')
    console.assert(nums[1] === 5, 'nums[1] is 5')
}

console.info('CASE copy within with negative start index')

{
    const nums = new Curray(1, 2, 3, 4, 5)
    
    nums.copyWithin(1, -2)

    console.assert(nums[1] === 4, 'nums[1] is 4')
    console.assert(nums[2] === 5, 'nums[2] is 5')
}

console.info('CASE copy within with negative end index')

{
    const nums = new Curray(1, 2, 3, 4, 5)
    
    nums.copyWithin(0, 1, -1)

    console.assert(nums[0] === 2, 'nums[0] is 2')
    console.assert(nums[1] === 3, 'nums[1] is 3')
    console.assert(nums[2] === 4, 'nums[2] is 4')
    console.assert(nums[3] === 4, 'nums[3] is 4')
}

console.info('TEST Curray.prototype.every')

console.info('CASE all elements satisfy condition')

{
    const nums = new Curray(2, 4, 6, 8)

    const result = nums.every(num => num % 2 === 0)

    console.assert(result === true, 'result is true')
}

console.info('CASE not all elements satisfy condition')

{
    const nums = new Curray(2, 4, 5, 8)

    const result = nums.every(num => num % 2 === 0)

    console.assert(result === false, 'result is false')
}

console.info('TEST Curray.prototype.fill')

console.info('CASE fill without start and end')

{
    const nums = new Curray(1, 2, 3)

    nums.fill(0)

    console.assert(nums[0] === 0, 'nums[0] is 0')
    console.assert(nums[1] === 0, 'nums[1] is 0')
    console.assert(nums[2] === 0, 'nums[2] is 0')
}

console.info('CASE fill with start and end')

{
    const nums = new Curray(1, 2, 3, 4)

    nums.fill(0, 1, 3)

    console.assert(nums[1] === 0, 'nums[1] is 0')
    console.assert(nums[2] === 0, 'nums[2] is 0')
    console.assert(nums[3] === 4, 'nums[3] is 4')
}

console.info('TEST Curray.prototype.filter')

console.info('CASE filter elements based on condition')

{
    const nums = new Curray(1, 2, 3, 4, 5)

    const result = nums.filter(num => num > 2)

    console.assert(result.length === 3, 'result length is 3')
    console.assert(result[0] === 3, 'result[0] is 3')
    console.assert(result[2] === 5, 'result[2] is 5')
}

console.info('TEST Curray.prototype.find')

console.info('CASE find element based on condition')

{
    const nums = new Curray(1, 2, 3, 4, 5)

    const result = nums.find(num => num > 3)

    console.assert(result === 4, 'result is 4')
}

console.info('TEST Curray.prototype.findIndex')

console.info('CASE find index based on condition')

{
    const nums = new Curray(1, 2, 3, 4, 5)

    const result = nums.findIndex(num => num > 3)

    console.assert(result === 3, 'result is 3')
}

console.info('TEST Curray.prototype.findLast')

console.info('CASE find last element based on condition')

{
    const nums = new Curray(1, 2, 3, 4, 5)

    const result = nums.findLast(num => num > 2)

    console.assert(result === 5, 'result is 5')
}

console.info('TEST Curray.prototype.findLastIndex')

console.info('CASE find last index based on condition')

{
    const nums = new Curray(1, 2, 3, 4, 5)

    const result = nums.findLastIndex(num => num > 2)

    console.assert(result === 4, 'result is 4')
}
