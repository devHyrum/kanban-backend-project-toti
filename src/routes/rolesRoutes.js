import express from 'express'
import { getRoles } from '../controllers/rolesController.js';

const router = express.Router()

router.get('/', getRoles)

router.get('*', (req, res) => res.end('...roles/GET: Não existe a rota'))

export default router;