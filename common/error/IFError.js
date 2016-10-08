


function newError(code){
    var obj = {
        code:code,
        message:Message[code]
    };
    return JSON.stringify(obj);
}

function newUnkonwError(code,message){
    if(message == undefined){
        message = "未知错误";
    }
    var obj = {
        code : code,
        message:message
    };
    return JSON.stringify(obj);
}

function success(data){
    var _code = Code.E_NONE;
    var obj = {
        code : _code,
        message:Message[_code],
        data: data
    };
    return JSON.stringify(obj);
}


var Code = {};
var Message = {};

Code.E_UNKNOW  = -1;

Code.E_NONE  =   0;
Message[Code.E_NONE] = "成功";

Code.E_PARAM_ERROR = 1;
Message[Code.E_PARAM_ERROR] = "参数错误";

Code.E_USER_EXIST = 1000;
Message[Code.E_USER_EXIST] = "用户已存在";

Code.E_ERROR_ACCOUNT_PASSWORD = 1001;
Message[Code.E_ERROR_ACCOUNT_PASSWORD] = "错误的用户名或密码";

Code.E_ERROR_SESSION_INVALID = 1002;
Message[Code.E_ERROR_SESSION_INVALID] = "无效的session";

Code.E_SQL_ERROR = 2000;
Message[Code.E_SQL_ERROR] = "数据库操作失败";
Code.E_REDIS_ERROR =2001;
Message[Code.E_REDIS_ERROR] = "Redis操作失败";
Code.E_RPC_ERROR = 2002;
Message[Code.E_RPC_ERROR] = "Rpc错误";


Code.E_USER_OFFLINE = 3001;
Message[Code.E_USER_OFFLINE] = "用户不在线";


Code.E_FAIL = 5000;
Message[Code.E_FAIL] = "操作失败";





module.exports = {
    Code:Code,
    Message:Message,
    newError:newError,
    newUnknowError:newUnkonwError,
    success:success
};
