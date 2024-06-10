var Curray = require('./Curray')
require('./Curray.prototype.forEach')

console.info('TEST forEach')

var chars = 

Array.forEach = function (callback) {
    for (var i = 0; i < this.length; i ++) {
        var elem = this[i]

        callback(ele, i, this)
    }
}