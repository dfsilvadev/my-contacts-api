const ContactsRepository = require("../repositories/ContactsRepository");

const { STATUS } = require("../../utils/common/constant/status");

class ContactController {
  /**
   * Get All Contacts
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const { orderBy } = req.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    /**
     * Wildcard => Curinga
     * res.setHeader("Access-Control-Allow-Origin", "*");
     */
    res.json(contacts);
  }

  /**
   * Get Contact By ID
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async show(req, res) {
    const { id } = req.params;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res
        .status(404)
        .json({ error: true, message: STATUS.CONTACT.NOT_FOUND });
    }

    res.json(contactExists);
  }

  /**
   * Create New Contact
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: true, message: STATUS.ALL.NAME_IS_REQUESTED });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return res
        .status(400)
        .json({ error: true, message: STATUS.CONTACT.EMAIL_IN_USE });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    res.status(201).json(contact);
  }

  /**
   * Update Contact
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res
        .status(404)
        .json({ error: true, message: STATUS.CONTACT.NOT_FOUND });
    }

    if (!name) {
      return res
        .status(400)
        .json({ error: true, message: STATUS.ALL.NAME_IS_REQUESTED });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail._id !== id) {
      return res
        .status(400)
        .json({ error: true, message: STATUS.CONTACT.EMAIL_IN_USE });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    res.json(contact);
  }

  /**
   * Delete Contact
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const { id } = req.params;

    await ContactsRepository.delete(id);

    res.status(200).json({ status: "Ok", message: STATUS.ALL.DELETED_ITEM });
  }
}

module.exports = new ContactController();
