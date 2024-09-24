import express from 'express'
import categorieController from '../controllers/taskCategorieControllers.js'

const router = express.Router()

router.get('/', categorieController.getCategories)

export default router;