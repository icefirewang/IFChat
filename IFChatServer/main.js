
'use strict'

console.log('chat server Start');


var debug = require('debug')('IFChat:IFChatServer');

var args = process.argv;
var execArgs = process.execArgv;

var argData = JSON.parse(args[args.length-1]);

var debugMode = argData.debug;
var serverId = argData.serverId;

var globalData = require("./globalData/globalData");
globalData.debugMode = debugMode;
globalData.serverId = serverId;

/*
*
*   设置server 信息
*
* */
var servers = null;
console.log("debug "+debugMode);
if (debugMode == true){
    servers = require('../config/servers.json').development;
}else {
    servers = require('../config/servers.json').production;
}
console.log("server info :>> "+JSON.stringify(servers));

globalData.servers = servers;

/*
 *
 *   找出自己是哪个server
 *
 * */
var chatServers = servers['IFChatServer'];
chatServers.forEach(function (server) {
    if(server.id === serverId){
        console.log("self server:>> "+JSON.stringify(server));
        globalData.serverSelf = server;
    }
});

var chatServers = servers['IFChatServer'];
chatServers.forEach(function (server) {
    chatServers[server.id] = server;
});

globalData.chatServers = chatServers;




if (globalData.serverSelf === undefined){
    console.error("can find self");
    process.abort();
}

/*
*
*  保存信息到全局数据
* */
global.data = globalData;


/*
*   创建 Express App
*
* */

var expressApp = require('./expressApp');
var serverPort = global.data.serverSelf.port;
var port = normalizePort(process.env.PORT || serverPort);
expressApp.set('port',port);

var http = require('http');
var logger = require('./logger/IFLogger');


/**
 * Create HTTP server.
 */
var server = http.createServer(expressApp);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/*启动 Websocket 服务器*/
var WSServer = require("./socket/websocket/IFChatWSServer");
var wsServer = new WSServer(server);


/*启动 Rpc 服务器*/
var rpcServer = require("./RPCServer/RPCServer");


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


