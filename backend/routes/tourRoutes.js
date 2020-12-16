import express from 'express'
import {getTours,getTourById} from '../controllers/tourController.js'

const router = express.Router()


    
router.route('/').get(getTours)
router.route('/:id').get(getTourById)

export default router