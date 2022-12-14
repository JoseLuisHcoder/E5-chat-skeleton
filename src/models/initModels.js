const Users = require('./users.models')
const RecoveryPassword = require('./recoveryPasswords.models')

const initModels = () => {
    //FK = RecoveryPassword
    Users.hasMany(RecoveryPassword)
    RecoveryPassword.belongsTo(Users)
}

module.exports = initModels