console.info('TEST flat')

console.info('CASE flats 1 level')

var nums = [10, 20, 30, [40, 50, [60, 70, 90, [100, 110]]]]

var flatted = chars.flat()

console.assert(flatted[0] === 10, 'flatted at 0 is 10')
console.assert(flatted[1] === 20, 'flatted at 0 is 20')