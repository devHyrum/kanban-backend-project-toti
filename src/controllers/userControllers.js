import User from '../models/userModel.js'

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAll()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
}

exports.createUser = async (req, res) => {
  try {
    const { name, email, description, jobTitle, roleId } = req.body
    const result = await User.create(name, email, description, jobTitle, roleId)
    res.json({ message: 'Usuário criado com sucesso', userId: result.insertId })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}
