

function SocketUser(type,id,os) {
    this.userId = (id == null?0:id);
    this.userType = (type == null?0:type);
    this.userOS = os;
}

var Type  = require("./SocketUserType");

SocketUser.Type = Type;

module.exports = SocketUser;

// module.exports =  {
//     Object : SocketUser,
//     Type : Type
// };