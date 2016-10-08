var path = require('path')


function initial(app)
{
    console.log('initial log4js');
    var log4js = require('log4js');
    log4js.configure(require('../config/log4js.json'));
    var logger = log4js.getLogger('normal');
    logger.setLevel('INFO');
    if (app !== undefined){
        app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));
    }

}


module.exports = function (app) {
    initial(app);
}