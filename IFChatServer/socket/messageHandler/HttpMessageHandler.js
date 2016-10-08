'use strict'

var util = require("util");

var MessageHandler = require("./MessageHandler");

function HttpMessageHandler() {}

util.inherits(HttpMessageHandler,MessageHandler);

module.exports = HttpMessageHandler;



HttpMessageHandler.prototype.init = function () {
    
}