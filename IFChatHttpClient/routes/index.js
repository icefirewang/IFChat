var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {



    //res.render('index', { title: 'Express' });
    var session = req.session;
    session.uid = 10;
    req.session.save(function (err) {
        console.log(err);
    });
    //   res.cookie('sessionId',session.id,{maxAge:600000,path:'/'});
    res.send('hello, session id:' + session.id);





    //res.send('Chat Server');
});

module.exports = router;
