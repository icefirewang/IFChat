
var chatServer = null;
window.onload = function () {
    var url = window.location;
    console.log("url "+url);
    chatServer = gup("server",url);
    console.log("chatServer "+chatServer);
    onConnect(chatServer);
};

function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}
/*
*  websocket 对象
* */
var socket = null;

function onConnect(server) {
    var wsHost = server.replace("http","ws");
    console.log("wsHost "+wsHost);
    socket = new WebSocket(wsHost);
    socket.onopen = function(event){
        wsOnOpen(socket,event);
    }

    socket.onmessage = function (event) {
        wsOnMessage(socket,event);
    }

    socket.onclose = function (event) {
        wsOnClose(socket,event);
    }
}

function wsOnOpen(ws,event) {

}

function wsOnMessage(ws,event) {
    var received_msg = event.data;
    console.log(received_msg);
}

function wsOnClose(ws,event) {
    console.log("socket closed");
}


var MessageType = {
    TEXT : 1000,
    IMAGE: 1001
}

function onSendTextMessage(message,to) {
    var message = $("#messageTextfield").val();
    var toType = $("#toTypeTextfield").val();
    var toId = $("#toIdTextfield").val();


    var msgObj = {
        mType : MessageType.TEXT,
        mContent : message,
        rId : toId,
        rType : toType
    };
    var json = JSON.stringify(msgObj);


    var url = chatServer+"/user/sendIMMessage"
    console.log(url);
    $.ajax({
        url: url,
        dataType: 'text',
        type: 'post',
        timeout: 15000,
        xhrFields: {withCredentials: true},
        data: {
            "message": json
        },
        success: function (json) {
            console.log(json);
            var data;
            try {
                data = JSON.parse(json);
            } catch (err) {
                alert("JSON错误")
                cb(err);
                return;
            }
            if (data.code == 0) {
                chatHost = data.data.server.host;
                port = data.data.server.port;
                console.log("host " + chatHost);
                cb(null);
            } else {
                var error = new Error(data.message);
                cb(error);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest, XMLHttpRequest.readyState, textStatus);
            var error = new Error('http error');
            error.code = textStatus;
            cb(error);
            //     alert('error code:'+XMLHttpRequest.status);
        }
    });

}