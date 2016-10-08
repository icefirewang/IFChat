/**
 * Created by icefire_wang on 2016/10/3.
 */


var chatHost = null;
var port = null;

function getServer(account,cb){
    console.log('account '+account);
    $.ajax({
        url: "http://127.0.0.1:3002/getChatServer",
        dataType: 'text',
        type: 'post',
        timeout:15000,
        data:{
            "account":account
        },
        success:function (json) {
            console.log(json);
            var data ;
            try {
                data = JSON.parse(json);
            }catch(err){
                alert("JSON错误")
                cb(err);
                return;
            }
            if(data.code == 0){
                chatHost = data.data.server.host;
                port = data.data.server.port;
                console.log("host "+chatHost);
                cb(null);
            }else{
                var error = new Error(data.message);
                cb(error);
            }

        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, XMLHttpRequest.readyState, textStatus);
            var error = new Error('http error');
            error.code = textStatus;
            cb(error);
            //     alert('error code:'+XMLHttpRequest.status);
        }
    });
}

function login(account,password,cb) {

    var server = chatHost+":"+port;
    var url = `http://${server}/user/login`;
    console.log('url '+url);
    $.ajax({
        url: url,
        dataType: 'text',
        type: 'post',
        timeout:15000,
        xhrFields: { withCredentials:true },
        data:{
            "account":account,
            "password":password
        },
        success:function (json) {
            console.log(json);
            var data ;
            try {
                data = JSON.parse(json);
            }catch(err){
                alert("JSON错误")
                cb(err);
                return;
            }
            if(data.code == 0){

                cb(null);
            }else{
                var error = new Error(data.message);
                cb(error,null);
            }

        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, XMLHttpRequest.readyState, textStatus);
            var error = new Error('http error');
            error.code = textStatus;
            cb(error);
            //     alert('error code:'+XMLHttpRequest.status);
        }
    });
}


function onLogin() {
    var account = $("#accountTextfield").val();
    var password = $("#passwordTextfield").val();

    if (account.length == 0 || password.length == 0){
        return;
    }

    getServer(account,function (err) {
        if(err == null){
            login(account,password,function (err) {
                if (err == null){
                    var server = "http://"+chatHost+":"+port;
                   // var newLocation = "/html/userMain.html" +"?"+ `server=${server}`;
                    var newLocation = `http://${chatHost}:${3003}`+"/html/userMain.html" +"?"+ `server=${server}`;
                    //alert(newLocation);
                    console.log("new location "+ newLocation);
                   window.location =location.href = newLocation;
                }
            });
        }

    });
}