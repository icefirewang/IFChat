
'use strict'

var Redis = require("redis");
var logger = require("../logger/IFLogger");


var _client = null;

// 初始化 redis client
client();

/*
*   redis client 获取函数
*
* */
function client() {
    if(_client == null){
        var config = require("../config/redis.json");
        _client = Redis.createClient(config.port,config.server,{});
        _client.on('error',function (err) {
            console.log(err);
        });
        _client.on('quit',function (err) {
            console.log('close:'+ err);
        });
    }
    return _client;
}



module.exports = client;