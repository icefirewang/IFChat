'use strict'

var BaseController =require("../BaseController");
var Funcs = require("./UserFuncs");
var IFSocket  = require("../../../common/models/IFSocket/IFSocket");


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
    var sessionId = self.pri.req.session.id;
    console.log("org session id " +sessionId);
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

        var data = {user:user};
        var ret = self.error.success(data);
        // session 处理
        self.pri.req.session.userId = user.userId;
        var type = IFSocket.SocketUser.Type.User;
        self.pri.req.session.userType =  type;
        self.pri.req.session.save();
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
/*
*
*   设置姓名
*
* */
UserController.prototype.setName = function () {




}


/*
* 
*   发送消息
* 
* */
UserController.prototype.sendIMMessage = function () {
    var self = this;
    var session = this.pri.req.session;
    var from = new IFSocket.SocketUser(session.userType,session.userId,session.OSType);
    try{
        var msg = JSON.parse(self.pri.req.body.message);
    }catch(err){
        console.log(this.pri.req.body.message);
        var ret = this.error.newError(this.error.Code.E_PARAM_ERROR);
        this.pri.res.send(ret);
        return;
    }

    // 参数检查
    if (msg == null){
        // 参数错误
        var ret = this.error.newError(this.Code.E_PARAM_ERROR);
        this.pri.res.send(ret);
        return;
    }

    // session 判断
    if (from.userId == 0 || from.userType != IFSocket.SocketUser.Type.User){
        var ret = this.error.newError(this.error.Code.E_ERROR_SESSION_INVALID);
        this.pri.res.send(ret);
        return;
    }


    this.funcs.sendIMMessage(from,msg,function (err,status) {
        if (err){
            var ret = self.error.newError(err.code);
            self.pri.res.send(ret);
            return;
        }else{

        }
    });
}





module.exports = UserController;