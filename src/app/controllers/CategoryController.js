const CategoriesRepository = require("../repositories/CategoriesRepository");

const { STATUS } = require("../../utils/common/constant/status");

class CategoryController {
  /**
   * Get All Categories
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const { orderBy } = req.query;

    const category = await CategoriesRepository.findAll(orderBy);

    res.json(category);
  }

  /**
   * Get Category By ID
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async show(req, res) {
    const { id } = req.params;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res
        .status(404)
        .json({ error: true, message: STATUS.CATEGORY.NOT_FOUND });
    }

    res.json(categoryExists);
  }

  /**
   * Create New Category
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: true, message: STATUS.ALL.NAME_IS_REQUESTED });
    }

    const category = await CategoriesRepository.create({ name });

    res.status(201).json(category);
  }

  /**
   * Update Category
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res
        .status(404)
        .json({ error: true, message: STATUS.CATEGORY.NOT_FOUND });
    }

    if (!name) {
      return res.status(400).json({
        error: true,
        message: STATUS.ALL.STATUS.ALL.NAME_IS_REQUESTED,
      });
    }

    const category = await CategoriesRepository.update(id, {
      name,
    });

    res.json(category);
  }

  /**
   * Delete Category
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);

    res.status(200).json({ status: "Ok", message: STATUS.ALL.DELETED_ITEM });
  }
}

module.exports = new CategoryController();
