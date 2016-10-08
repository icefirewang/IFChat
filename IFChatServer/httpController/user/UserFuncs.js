var BaseControllerFuncs = require("../BaseControllerFuncs");


var util = require('util');
var models = require("../../mysql_models");
var IFSocket  = require("../../../common/models/IFSocket/IFSocket");
var SKSender = require("../../socket/websocket/IFChatWSSender");


function UserFuncs() {
    this.init();
}

util.inherits(UserFuncs,BaseControllerFuncs);


/*
 *  用户登录
 *
 * */
UserFuncs.prototype.login = function (account,password,cb) {
    // 数据库中查找
    var self = this;
    self.findUser(account,password,function (err,user) {
        if(err){
            cb(err);
            return;
        }
        cb(null,user);
    })
}

UserFuncs.prototype.findUser = function (account,password,cb) {
    var self = this;
    var usere = models.User.findOne({
        where:{
            phone:account,
            password:password
        }
    }).then(function (user) {
        // 找不到用户
        if(user == null){
            let error = new Error('错误的用户名或密码');
            error.code = self.error.Code.E_ERROR_ACCOUNT_PASSWORD;
            cb(error);
            return;
        }
        // 找到用户
        cb(null,user);

    }).catch(function (err) {
        self.logger.error(__dirname + err);
        let error = new Error('操作失败');
        error.code = self.error.Code.E_FAIL;
        cb(error);
    });
}


/*
 *  用户注册
 *
 * */
UserFuncs.prototype.regist = function (account,password,cb) {
   var self = this;
   var user = models.User.findOne({
        where:{
            phone:account
        }
    }).then(function (user) {

       // 用户已存在
        if (user != null){
            var error = new Error('user exist');
            error.code = self.error.Code.E_USER_EXIST
            cb(error);
            return;
        }
       // 创建新用户
       models.User.create({
           phone: account,
           password:password
       }).then(function(newUser){
           // 创建成功
          cb(null,newUser);
       }).catch(function(err){
           // 创建失败
           self.logger.error(err);
           var error = new Error('create user fail');
           error.code = self.error.Code.E_SQL_ERROR;
           cb(error);
           return;
       });

    })
}

/*
*
*   发送 IM 数据
*
 */
UserFuncs.prototype.sendIMMessage = function (from,msg,callback){
    var self = this;
    if(checkIMMessage(from,msg) == false){
        var err = new Error("data inCorrect");
        err.code = self.error.Code.E_PARAM_ERROR;
        this.logger.error("msg data error:>>");
        this.logger.error(from);
        this.logger.error(msg);
        callback(err);
        return;
    }

    var ts = new Date().getTime();

    models.Message.create({
        type : msg.mType,
        content:msg.mContent,
        senderType : from.userType,
        senderId : from.userId,
        receiverId : msg.rId,
        receiverType : msg.rType,
        ts:ts
    }).then(function(newMessage){
        // 创建成功
        console.log("new message "+ JSON.stringify(newMessage));
        var sender = new SKSender();
        sender.init(newMessage);
        sender.send(function (err) {
            callback(err);
        });
    }).catch(function(err){
        // 创建失败
        self.logger.error(err);
        console.log(err);
        var error = new Error('create message fail');
        error.code = self.error.Code.E_SQL_ERROR;
        callback(error);
        return;
    });
}


function checkIMMessage(from,msg) {
    if (from.userType != IFSocket.SocketUser.Type.User ||
    from.userId <= 0 ||
    msg.mType < IFSocket.Message.Type.USER_MIN ||
    msg.mType > IFSocket.Message.Type.USER_MAX){
        return false;
    }
}


module.exports =  UserFuncs;
