import { HttpCode } from "../../lib/consts";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  patchContact,
} from "../../repository/contacts";

class ContactsControllers {
  async getContacts(req, res, next) {
    const { id } = req.user;
    const data = await listContacts(id);
    res.status(HttpCode.OK).json(data);
  }

  async addContact(req, res, next) {
    const { id } = req.user;
    const newContact = await addContact(req.body, id);
    res.status(HttpCode.CREATED).json(newContact);
  }

  async getContactById(req, res, next) {
    const { contactId } = req.params;
    const { id: userId } = req.user;
    const contact = await getContactById(contactId, userId);
    if (contact) {
      return res.status(HttpCode.OK).json(contact);
    }
    return res.status(HttpCode.NOT_FOUND).json({ message: "not found" });
  }

  async removeContact(req, res, next) {
    const { contactId } = req.params;
    const { id: userId } = req.user;
    const contactsList = await removeContact(contactId, userId);
    if (contactsList) {
      return res.status(HttpCode.OK).json({ message: "contact deleted" });
    }
    return res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
  }

  async updateContact(req, res, next) {
    const { id: userId } = req.user;
    const contact = await updateContact(req.params.contactId, userId);
    if (contact) {
      return res.status(HttpCode.OK).json(contact);
    }
    return res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
  }

  async updateStatusContact(req, res, next) {
    const { id: userId } = req.user;
    const contact = await patchContact(req.params.contactId, req.body, userId);
    if (contact) {
      return res.status(HttpCode.OK).json(contact);
    }
    return res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
  }
}

export default ContactsControllers;
