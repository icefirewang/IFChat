
var check = require("./ParameterCheck");
var Desc = require("./ParameterDesc");

console.log("parameterCheck test start");
Desc.b();


var desc = new Desc("1","int",false,1);
console.log(desc);
var desc1 = new Desc("","int","123","aaaa");