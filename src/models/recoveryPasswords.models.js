const {DataTypes} = require('sequelize')
const Users = require('./users.models')
const db = require('../utils/database')

//la tabla de recoveryPassword es para que los enlaces sean de un solo uso
const RecoveryPassword = db.define('recovery_password', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId : {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
             model: Users,
             key: 'id'
        }
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})
module.exports = RecoveryPassword