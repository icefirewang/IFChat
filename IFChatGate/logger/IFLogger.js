var log4js = require('log4js');

function getLogger()
{
    var ret = null;
    // debug 环境下
    if(global.data.debugMode == true){
        ret  = log4js.getLogger('debug');  // console 对应配置里的 category = console
    }
    // 正式环境下
    else {
        ret = log4js.getLogger('release');      // release 对应配置里的 category = release
    }
    return ret;
}



module.exports = getLogger();
