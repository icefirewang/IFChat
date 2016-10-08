
var Desc = require("./ParameterDesc")

function parameterCheck(req,descs,err) {
    descs.forEach(function (desc) {
        var err = check(req,desc);
    });
}


function check(req,desc) {

    var value = req.body[desc.name];
    var require = desc.option;
    if (name == null && isOption == true){
        return false;
    }


    if (desc.match && typeof value !== "string"){
        return false;
    }else{
        return value.match(desc.match);
    }

}



module.exports = parameterCheck;