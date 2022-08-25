const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    // mostrar um registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: not found
      return response.status(404).json({ error: 'User Not Found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // Criar um novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'E-mail already registered' });
    }
    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    // editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'User Not Found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'E-mail already registered' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);
    // 204: é o código 200 mas sem corpo
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
