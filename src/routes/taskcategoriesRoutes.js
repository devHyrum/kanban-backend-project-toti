import express from 'express'
import categorieController from '../controllers/taskCategorieControllers.js'

const router = express.Router()

router.get('/', categorieController.getCategories)

router.get('*', (req, res) => res.end('..taskCategorie/GET: Não existe a rota'))

export default router;