



function ParameterDesc(name,type,required,match) {

    if (name.length == 0){
        console.error("check parameter error");
        console.error(this);
        return;
    }

    this.name = name;

    this.type = null;
    if(type != null){
        this.type = type;
    }

    this.required = true;
    if(required != null){
        if (typeof required !== "bool"){
            console.error("required参数 必须是个bool类型");
        }else{
            this.required = required;
        }
    }

    this.match = "";
    if (match != null){
        if (typeof match !== "string"){
            console.error("match参数 必须是个string 类型");
        }else{
            this.match = match;
        }

    }


}

function B(){
    console.log("b");
    _.a = "a";
    console.log(_.a);
}


_.a();

module.exports = ParameterDesc;
module.exports.b = B;