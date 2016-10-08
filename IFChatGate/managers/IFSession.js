/**
 * Created by icefire_wang on 16/9/9.
 */

"use strict";
var logger = require("../logger/IFLogger");
//var jsonConvertor = require("../utils/JsonConverter");
var path = require('path')

var _initialed = false;

function initial(app)
{
    if(_initialed == false){
        _initialed = true;
    }else{
        logger.error("session already initialed");
        return;
    }

    var session = require('express-session');
//    var filePath = path.resolve("IFChat/configs/log4js.json");
    var redisconfig = require('../config/redisSession.json');
    var RedisStore = require('connect-redis')(session);
    var redisStore = new RedisStore(redisconfig);

    app.use(session(
        {
            name:"IFChatSession",
            store:redisStore,
            secret:"secret",
            proxy:true,
            resave:true,
            saveUninitialized:false,
            cookie:{secure:false,maxAge:1000*60*30}
        }
    ));
    var cookieParser = require('cookie-parser');
    app.use(cookieParser());
    global.sessionStore = redisStore;
    logger.info("session initial over");
}


module.exports = {
    initial:initial
};
