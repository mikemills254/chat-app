import * as auth from '../Controller/authcontroller.js'
import * as chat from '../Controller/chatcontroller.js'
import express from 'express'

const router = express.Router()

router.route('/login').post(auth.login)
router.route('/register').post(auth.registerClient)
router.route('/agent/register').post(auth.registerAgent)
router.route('/user/:id').get(auth.getSpecificUser)
router.route('/sendMessage').post(chat.clientMessage)
router.route('/message').get(chat.getMessages)
router.route('/message/:id').post(chat.updateMessage)
router.route('/message/:id').get(chat.getSpecificMessage)
router.route('/response').post(chat.agentResponse)
router.route('/agents').get(auth.getAgents)
export default router