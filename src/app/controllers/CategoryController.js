const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;

    const category = await CategoriesRepository.findAll(orderBy);

    res.json(category);
  }

  async show(req, res) {
    const { id } = req.params;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: "Contact not found." });
    }

    res.json(categoryExists);
  }

  async store(req, res) {
    const { name } = req.body;

    console.log(name);

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const category = await CategoriesRepository.create({ name });

    res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found." });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
