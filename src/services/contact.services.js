import ContactModel from '#Schemas/contact.schema.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllContacts = async () => {
    const allContacts = await ContactModel.find({});
    return allContacts;
};
export const getContactById = async contactId => {
    const contact = await ContactModel.findById(contactId).exec();
    return contact;
};
export const createContact = async data => {
    const newContact = { _id: uuidv4(), ...data };
    const createdContact = new ContactModel(newContact);
    await createdContact.save();
    return createdContact;
};
export const updateContact = async (data, currentContact) => {
    const { name, email, phone, role, isAvailable } = data;
    currentContact.name = name;
    currentContact.email = email;
    currentContact.phone = phone;
    currentContact.role = role;
    currentContact.isAvailable = isAvailable;
    await currentContact.save();
};
