/**
 * Created by icefire_wang on 2016/9/30.
 */


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var routes = require('./routes/index');
var users = require('./routes/user');
var setups = require('./routes/setup');

var app = express();



//  初始化 session 设置
var sessionManager = require('./managers/SessionManager');
sessionManager.initial(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
*   设置内部服务器
* */
var acessControlAllowOriginHost = [];
var serverGroup = global.data.servers;
Object.keys(serverGroup).forEach(function (key) {
    console.log(key);
    servers = serverGroup[key];
    servers.forEach(function (server) {
        var adr1 = "http://" + server.host + ":" +server.port;
        var adr2 = "http://localhost:"+server.port;
        acessControlAllowOriginHost.push(adr1);
        acessControlAllowOriginHost.push(adr2);

    });
});
console.log("acessControlAllowOriginHost "+ acessControlAllowOriginHost);

app.use('/',function (req,res,next) {
    var origin = req.headers.origin;
    if (acessControlAllowOriginHost.indexOf(origin) > -1){
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
})

app.use('/', routes);
app.use('/user', users);
app.use('/setup', setups);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




global.rootPath = __dirname;


//  初始化Log4js
var loggerInit = require('./logger/IFLoggerInit');
loggerInit(app);
var logger = require('./logger/IFLogger');
logger.info('logger initial over');
logger.error('logger initial over');



module.exports = app;
