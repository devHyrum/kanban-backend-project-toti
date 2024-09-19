import { User } from '../models/userModel.js'
import fs from 'fs'
import path from 'path'
import { __dirname } from '../utils/utils.js'

const userPhotosPath = path.join(__dirname, '../uploads/user_photo')

export const getUsers = async (req, res) => {
  try {
    const users = await User.getAll()
    console.log('Usuários encontrados:', users)
    res.json(users)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
}

export const getUserByID = async (req, res) => {
  try {
    const user = await User.getUser(req.params.id)
    console.log('Usuário encontrado:', user)
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o usuário' })
  }
}


export const createUser = async (req, res) => {
  try {
    const { name, email, description, jobTitle, roleId } = req.body
    const user_photo = req.file ? req.file.filename : null 

    const result = await User.create(name, email, description, jobTitle, roleId, user_photo)
    res.json({ message: 'Usuário criado com sucesso', userId: { name, email, description, jobTitle, roleId, user_photo } })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, description, jobTitle, roleId } = req.body
    const user_photo = req.file ? req.file.filename : null

    // Se houver uma nova imagem e um id fornecido, delete a imagem antiga
    if (user_photo) {
      // Primeiro, obtenha o usuário para saber a foto atual
      const oldUser = await User.getUser(id)

      // Se o usuário já tiver uma foto e for diferente da nova
      if (oldUser.user_photo && oldUser.user_photo !== user_photo) {
        // Caminho completo do arquivo antigo
        const oldPhotoPath = path.join(userPhotosPath, oldUser.user_photo)
        
        // Verifique se o arquivo antigo existe e delete-o
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath)
        }
      }
    }

    // Atualize o usuário no banco de dados
    const result = await User.update(id, name, email, description, jobTitle, roleId, user_photo)
    res.json({ message: 'Usuário atualizado com sucesso', userId: { name, email, description, jobTitle, roleId, user_photo } })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    // Obtenha o usuário para saber qual foto está associada
    const user = await User.getUser(id)

    // Se houver uma foto associada, exclua-a
    if (user.user_photo) {
      const photoPath = path.join(userPhotosPath, user.user_photo)
      
      // Verifique se o arquivo existe e exclua-o
      if (fs.existsSync(photoPath)) { // verificar oi motivo de não funcioanr
        fs.unlinkSync(photoPath)
      }
    }

    // Delete o usuário do banco de dados
    const result = await User.delete(id)
    res.json({ message: 'Usuário deletado com sucesso', userId: id })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' })
  }
}