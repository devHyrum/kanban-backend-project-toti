import { Roles } from "../models/rolesModel.js"

export const getRoles = async (req, res) => {
    try {
      const roles = await Roles.getAll()
      console.log('Roles registrados no sistema:', roles)
      res.json(roles)
    } catch (error) {
      console.error('Erro ao procurar os roles:', error)
      res.status(500).json({ error: 'Erro ao procurar os roles' })
    }
  }