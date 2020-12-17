import express from 'express'
import {protect} from '../Middleware/authMiddleware.js'
const router = express.Router()

import {authUser,getUserProfile,registerUser} from '../controllers/userController.js'

router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile)

export default router