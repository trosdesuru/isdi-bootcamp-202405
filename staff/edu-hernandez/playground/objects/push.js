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