import * as auth from '../Controller/authcontroller.js'
import express from 'express'

const router = express.Router()

router.route('/login').post(auth.login)
router.route('/register').post(auth.register)

router.route('/agent/login').post(auth.login)
router.route('/agent/register').post(auth.register)

export default router