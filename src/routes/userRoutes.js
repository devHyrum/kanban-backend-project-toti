import express from 'express'
import userController from '../controllers/userControllers.js'

const router = express.Router()

router.get('/', userController.getUsers)
router.post('/', userController.createUser)

module.exports = router
