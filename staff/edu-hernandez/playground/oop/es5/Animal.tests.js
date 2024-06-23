var Animal = require('./Animal')

var frank = new Animal('1991-11-16', 'Frank', 'Pereira', 'male')

console.log(frank)
console.log(frank.complain())
console.log(frank.eat('🥪'))
console.log(frank.poo())
console.log(typeof frank)
console.log(frank instanceof Animal)
console.log(frank instanceof Object)
console.log(frank instanceof Array)
console.log(frank.toString())