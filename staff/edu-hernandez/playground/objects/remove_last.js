console.log('CASE remove last element from object')

var object = new Object

object[0] = 10
object[1] = 20
object[2] = 30
object.length = 3

console.log(object)

// object.length = object.length - 1
// object.length -= 1
object.length--

console.log(object)
// { 0: 10, 1: 20, length: 2 }