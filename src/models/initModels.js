const Users = require('./users.models')
const RecoveryPassword = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')


const initModels = () => {
    //FK = RecoveryPassword
    Users.hasMany(RecoveryPassword)
    RecoveryPassword.belongsTo(Users)

    // Users -> messages
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    //users - conversations
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    // users - participants , tabla pivote entre users - conversations (participar en una conversations)
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    //conversation - messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //conversaciones - participants Tabla pivote entre users - conversations
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)




}

module.exports = initModels