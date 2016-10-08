/**
 * Created by icefire_wang on 16/9/9.
 */

"use strict";
var logger = require("../logger/IFLogger");
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
    var redisconfig = require('../config/redisSession.json');
    var RedisStore = require('connect-redis')(session);
    var redisStore = new RedisStore({
       host:"127.0.0.1",
        port:6379,
       db:10
     });

    redisStore.client.on("error",function (err) {
       console.error("redis "+err);
    });

    redisStore.client.on("connect",function () {
        console.log("redis connect");
    })

    var config = require("../config/session.json");
    config.store = redisStore;
    var sessionObj = session(config);
    // var sessionObj2 = session(
    //     {
    //         name:"IFChatSession",
    //         store:redisStore,
    //         secret:"secretWords",
    //         proxy:true,
    //         resave:true,
    //         saveUninitialized:false,
    //         cookie:{secure:false,maxAge:1000*60*30}
    //     }
    // );

    app.use(sessionObj);
    var cookieParser = require('cookie-parser');
    app.use(cookieParser());
    global.sessionStore = redisStore;
    logger.info("session initial over");
}


module.exports = {
    initial:initial
};
