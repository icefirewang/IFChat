"use strict";

var Sequelize = require("Sequelize")
var IFChat =require("../../common/models/IFSocket/IFSocket");



var Message = function(sequelize,DataTypes)
{
    var MessageMod = sequelize.define("Message", {
            messageId: {
                type: Sequelize.BIGINT,
                field: 'message_id',
                primaryKey: true,
                autoIncrement: true
            },
            type:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            senderId:{
                type:Sequelize.BIGINT,
                field:"sender_id",
                allowNull:false
            },
            senderType:{
                type:Sequelize.INTEGER,
                field:"sender_type",
                allowNull:false
            },
            receiverId:{
                type:Sequelize.BIGINT,
                allowNull:false,
                field:"receiver_id"
            },
            receiverType:{
                type:Sequelize.INTEGER,
                allowNull:false,
                field:"receiver_type"
            },
            content: {
                type: Sequelize.STRING(1024)
            },
            status:{
                type: Sequelize.INTEGER,
                defaultValue:0,
                allowNull : false,
                comment:"0:发送,1:接收,2:已读,3:删除"
            },
            ts:{
                type:Sequelize.BIGINT,
                allowNull:false,
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'create_time'
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'update_time'
            },
            deletedAt:{
                type: Sequelize.DATE,
                field: 'deleted_time'
            }
        },
        {
            freezeTableName:true,
            paranoid: true,
            tableName:"tb_message",
            instanceMethods:{
                toJSON:function(){
                    var values = this.get();
                    delete values.deletedAt;
                    delete values.createdAt;
                    delete values.updatedAt;
                    return values;
                }
            }
        }
    )

    return MessageMod;
}


module.exports = Message;