const router = require('express').Router()
const conversationServices = require('./conversations.services')
const passportJWT = require('../middleware/auth.middleware')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)

    router.route('/:conversation_id')
        .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getConversationById)
        .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchConversation)
        .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConversation)

module.exports = router


