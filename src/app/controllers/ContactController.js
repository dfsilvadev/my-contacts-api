const ContactsRepository = require("../repositories/ContactsRepository");

const { STATUS } = require("../../utils/common/constant/status");

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res.status(404).json({ error: STATUS.CONTACT.NOT_FOUND });
    }

    res.json(contactExists);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      return res.status(400).json({ error: STATUS.ALL.NAME_IS_REQUESTED });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: STATUS.CONTACT.EMAIL_IN_USE });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    res.json(contact);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return res.status(404).json({ error: STATUS.CONTACT.NOT_FOUND });
    }

    if (!name) {
      return res.status(400).json({ error: STATUS.ALL.NAME_IS_REQUESTED });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail._id !== id) {
      return res.status(400).json({ error: STATUS.CONTACT.EMAIL_IN_USE });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    await ContactsRepository.delete(id);

    res.status(200).json({ status: STATUS.ALL.DELETED_ITEM });
  }
}

module.exports = new ContactController();
