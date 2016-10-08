"use strict";

var Sequelize = require("Sequelize")



var User = function(sequelize,DataTypes)
{
    var UserMod = sequelize.define("User", {
            userId: {
                type: Sequelize.BIGINT,
                field: 'user_id',
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(100)
            },
            phone: {
                unique: true,
                type: Sequelize.STRING(30),
                allowNull:false
            },
            password:{
                type: Sequelize.STRING(50),
                allowNull:false
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
            tableName:"tb_user",
            instanceMethods:{
                toJSON:function(){
                    var values = this.get();
                    delete values.password;
                    delete values.deletedAt;
                    delete values.createdAt;
                    delete values.updatedAt;
                    return values;
                }
            }
        }
    )

    return UserMod;
}

module.exports = User;