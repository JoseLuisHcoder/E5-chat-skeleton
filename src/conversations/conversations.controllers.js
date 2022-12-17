const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')


const findAllConversations = async() => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model:{
                    model:Users
                }
            }
        }
    })
    return data = await Conversations.findOne({
        where: {
            id:id
        },
        include: {

        }
    })
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}


const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title:obj.title,
        imageUrl:obj.imageUrl,
        userId:obj.ownerId   //creador de la converasion (owner)  
    })

    const participant1 = await Participants.create({
        id:uuid.v4(),
        userId:obj.ownerId,   //este es el particpante1 - owner que vienes desde el token
        conversationId:newConversation.id
    })

    const participant2 = await Participants.create({
        id:uuid.v4(),
        userId:obj.participantId,  // este es el otro usuario que viene desde el body
        conversationId:newConversation.id
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

const updateConversation = async (id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id:id
        }
    })
    return data[0]
}

const deleteConversation = async (id, obj) => {
    const data = await Conversations.destroy(obj, {
        where: {
            id:id
        }
    })
    return data
}

// el ejemplo de como genera la convesacion esta en el video, con usuarios creados

// ejemplo, se debe tener dos usarios creados a los cuales correspondes los datos de abajo
// createConversation({
//     title: 'Conversacion Sahid - Evertz',//? Titulo del chat
//     ownerId: 'db8b69e8-3233-43a0-a0b1-87774ffc8566', //? Evertz como owner
//     participantId: 'c4a8c88d-37a8-4c38-b251-8cef07c33145' //? Sahid como invitado
// })
// .then(data => console.log(data))
// .catch(err => console.log(err))

module.exports = {
    findAllConversations,
    createConversation,
    findConversationById,
    updateConversation,
    deleteConversation
}