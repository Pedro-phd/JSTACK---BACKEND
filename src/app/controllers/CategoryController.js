const { response } = require('express');
const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findById(id);
    return response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const category = await CategoriesRepository.create({ name });
    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const category = await CategoriesRepository.update(id, name);

    return response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    return response.json({ message: 'Deletado com sucesso' });
  }
}

module.exports = new CategoryController();
