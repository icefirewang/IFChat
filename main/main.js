
console.log('main start');

var fork = require('child_process').fork;
var assert = require('assert');
var ip  = require('ip');


var debug = false;
process.execArgv.forEach(function(s){
    if(s.indexOf("debug") !== -1){
        debug = true;
        return;
    }
});


var argv = process.execArgv;



var servers;

if (debug == true){
    servers = require('../config/servers.json').development;
}else {
    servers = require('../config/servers.json').production;
}

console.log(servers);

for(var key in servers){
    console.log(`key ${key}`);
    if(servers.hasOwnProperty(key)){
        var serverArray = servers[key];
        startServers(key,serverArray);
    }
}


/*
 *   启动服务器组
 *
 * */
function startServers(type,servers){
    servers.forEach(function(server){
        console.log('server :');
        console.log(server);
        var host = server.host;
        var localIp = null;
        if (debug){
            localIp ="localhost"
        }else{
            localIp = ip.address();
        }
        console.log(`localIp + ${localIp} port:${server.port}`);
        if (host === localIp){
            console.log(`same ip`);
            startServer(type,server);
        }
    })
}
/*
 *   启动某个服务器
 *
 * */



function startServer(type,server){
    var filePath = __dirname;
    var serverId = server.id;

    if(type === 'IFChatGate'){
        filePath = './IFChatGate/main.js';
    }else if( type === 'IFChatServer'){
        filePath = './IFChatServer/main.js'
    }else if(type === 'IFChatHttpClient'){
        filePath = './IFChatHttpClient/main.js'
    }else{
        console.log('error type ' + type);
        assert.ok(false);
    }


    console.log(process.execArgv);
    // fork
    if (debug){
        process.execArgv = process.execArgv.filter(function(s){
            if(s.indexOf('--debug') !== -1){
                return false;
            }
            return true;
        });
        let temp = server.args;
        process.execArgv.push(temp);
    }

    var args = {
            "serverId":serverId,
            "debug":debug
        }

    var argsStr = JSON.stringify(args);

    console.log(process.execArgv);
    var worker = fork(filePath,[argsStr]);
    worker.on('message',function(m){
        console.log('message '+ m);
    });

    // cluster
    // var execArgv;
    // var debug = typeof v8debug === 'object';
    // var execArgs = process.execArgv;
    // console.log(execArgs);
    //
    // var cluster = require('cluster');
    // cluster.setupMaster({
    //     exec:filePath
    // });
    // cluster.fork();

}

