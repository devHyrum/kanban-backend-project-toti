import Categories from '../models/taskcategoriesModel.js'

export const getCategories = async (req, res) => {
    try{
        const categories = await Categories.getAll()
        res.json(categories)
    }catch (error){
        res.status(500).json({erro: "Erro ao buscar categorias"})
    }
}

export default { getCategories };