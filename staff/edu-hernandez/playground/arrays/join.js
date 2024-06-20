<<<<<<< HEAD
console.log('TEST JOIN')

console.log('CASE join in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

var animals2 = animals.join()
console.log(animals2)
// Dodo,Tiger,Penguin,Dodo,Elephant

var animals3 = animals.join(" + ")
console.log(animals3)
//Dodo + Tiger + Penguin + Dodo + Elephant

var animals4 = animals.join("/")
console.log(animals4)
//Dodo/Tiger/Penguin/Dodo/Elephant


console.log('CASE join elements with separator $')

var things = [true, 'hello world', 100, { name: 'Oswald' }, [10, 20, 30], function () { }]

var joined = things.join(' $ ')
console.log(joined)
//true $ hello world $ 100 $ {object Object} $ 10,20,30 $ function () { }
=======
console.log('CASE join elements from array')

var fruits = ['apple', 'orange', 'banana', 'pinapple', 'watermelon'] // new Array...

console.log(fruits)
// ['apple', 'orange', 'banana', 'pinapple', 'watermelon']

var joined = fruits.join()

console.log(joined)
// apple,orange,banana,pinapple,watermelon

console.log('CASE join elements with separator $')

var things = [true, 'hello world', 100, { name: 'Oswald' }, [10, 20, 30], function () { }]

var joined = things.join(' $ ')

console.log(joined)
// true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }

var joined = things.join()

console.log(joined)
// true,hello world,100,[object Object],10,20,30,function () { }

var joined = things.join(undefined)

console.log(joined)
// true,hello world,100,[object Object],10,20,30,function () { }

var joined = things.join('')

console.log(joined)
// truehello world100[object Object]10,20,30function () { }
>>>>>>> 804e4c522ff8404c95fc214063b0710cd047bd58
