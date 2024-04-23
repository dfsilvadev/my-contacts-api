const CategoriesRepository = require("../repositories/CategoriesRepository");

const { STATUS } = require("../../utils/common/constant/status");

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
      return res.status(404).json({ error: STATUS.CATEGORY.NOT_FOUND });
    }

    res.json(categoryExists);
  }

  async store(req, res) {
    const { name } = req.body;

    console.log(name);

    if (!name) {
      return res.status(400).json({ error: STATUS.ALL.NAME_IS_REQUESTED });
    }

    const category = await CategoriesRepository.create({ name });

    res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: STATUS.CATEGORY.NOT_FOUND });
    }

    if (!name) {
      return res
        .status(400)
        .json({ error: STATUS.ALL.STATUS.ALL.NAME_IS_REQUESTED });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);

    res.status(200).json({ status: STATUS.ALL.DELETED_ITEM });
  }
}

module.exports = new CategoryController();
