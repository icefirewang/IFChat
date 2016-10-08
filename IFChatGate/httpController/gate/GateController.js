'user strict'

var BaseController =require("../BaseController");
var Funcs = require("./GateFuncs");


var util = require('util');


function GateController() {
    this.funcs = new Funcs();
}

util.inherits(GateController,BaseController);




GateController.prototype.getChatServer = function () {

    /*
    *  check parameter here
    *  @account
    *
    * */
    var account = this.pri.req.body.account;


    var server = this.funcs.getChatServer(account);


    var ret = null;
    if (server == null){
        ret = this.error.newError(this.error.Code.E_FAIL);
    }else{
        var server = {
            host : server.host,
            port : server.port
        }
        var data  = {"server":server};
        ret = this.error.success(data);
    }
    this.pri.res.send(ret);

}



module.exports = GateController;