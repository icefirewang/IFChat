
var sessionConfig = require("../../config/session.json");
var cookieParser = require('cookie-parser')(sessionConfig.secret);

/*
 从ws 中获取 session
 */
function getSession(ws,callback) {
    cookieParser(ws.upgradeReq,null,function (err) {
        var sessionId = ws.upgradeReq.signedCookies[sessionConfig.name];
        global.sessionStore.get(sessionId, function (err, result) {
            callback(err, result);
        });
    });
};


module.exports ={
    getSession:getSession
}
