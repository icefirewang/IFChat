
'user strict'

var BaseController =require("../BaseController");
var Funcs = require("./UserFuncs");


var util = require('util');


function UserController() {
    this.funcs = new Funcs();
}

util.inherits(UserController,BaseController);

/*
 *  用户登录
 *
 * */
UserController.prototype.login = function () {
    var self = this;
    var account = this.pri.req.body.account;
    var password = this.pri.req.body.password;
    self.funcs.login(account,password,function (err,user) {
        if(err){
            let ret = self.error.newError(err.code);
            self.pri.res.send(ret);
            return;
        }
        if(user == null){
            self.logger.error(__dirname + "null user and null error");
            let ret = self.error.newError(self.error.Code.E_FAIL);
            self.pri.res.send(ret);
            return;
        }

        let data = {user:user};
        let ret = self.error.success(data);
        // session 处理
        self.pri.req.session.userId = user.userId;
        self.pri.res.send(ret);

    })
}



/*
*   用户注册
*
* */
UserController.prototype.regist = function () {

    var self = this;
    var account = this.pri.req.body.account;
    var password = this.pri.req.body.password;

    this.funcs.regist(account,password,function (err,user) {
        if (err != null ){
            var code = err.code;
            let ret = self.error.newError(code);
            self.pri.res.send(ret);
            return;
        }
        if (user == null){
            self.logger.error(__dirname + "null error with null user");
            let ret = self.error.newError(this.error.Code.E_FAIL);
            self.pri.res.send(ret);
            return;
        }

        let data = {user:user};
        let ret = self.error.success(data);
        self.pri.res.send(ret);
    })
}

UserController.prototype.setName = function () {


}


module.exports = UserController;