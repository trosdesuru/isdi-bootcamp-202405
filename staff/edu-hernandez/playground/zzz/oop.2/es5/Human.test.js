var Human = require('./Human')

var frank = new Human('1991-11-16', 'Frank', 'Pereira', 'male')

console.log(frank)
console.log(frank.complain())
console.log(frank.eat('🥪'))
console.log(frank.poo())
console.log(frank.add(1, 2))
console.log(frank.read('hola mundo'))
