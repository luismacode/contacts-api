import ContactModel from '#Schemas/contact.schema.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllContacts = async () => {
    const allContacts = await ContactModel.find({});
    return allContacts;
};
export const getContactById = async ({ contactId }) => {
    const contact = await ContactModel.findById(contactId).exec();
    return contact;
};
export const createContact = async ({ entry }) => {
    const newContact = { _id: uuidv4(), ...entry };
    const createdContact = new ContactModel(newContact);
    await createdContact.save();
    return createdContact;
};
export const updateContact = async ({ contactId, entry }) => {
    const currentContact = await getContactById({ contactId });
    if (!currentContact) return { isUpdated: false, data: undefined };
    const { name, email, phone, role, isAvailable } = entry;
    currentContact.name = name;
    currentContact.email = email;
    currentContact.phone = phone;
    currentContact.role = role;
    currentContact.isAvailable = isAvailable;
    await currentContact.save();
    return { isUpdated: true, data: currentContact };
};
export const deleteContact = async ({ contactId }) => {
    const currentContact = await getContactById({ contactId });
    if (!currentContact) return { isDeleted: false };
    currentContact.deleteOne();
    return { isDeleted: true };
};
