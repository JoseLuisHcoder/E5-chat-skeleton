const router = require('express').Router()
const conversationServices = require('./conversations.services')
const passportJWT = require('../middleware/auth.middleware')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)


module.exports = router


