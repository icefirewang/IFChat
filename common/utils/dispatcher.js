var crc = require('crc');
var assert = require("assert");
module.exports = function(key, array) {
    console.log(`dispatch key ${key} array ${array}`);
    var index = Math.abs(crc.crc32(key)) % array.length;
    console.log("index "+index);
    if (array.length == 0 ){
        assert.ok(false);
        return null;
    }
    return array[index];
};