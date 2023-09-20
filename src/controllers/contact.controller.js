import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} from '#Services/contact.services.js';

export const contactsController = async (_, res) => {
    const contacts = await getAllContacts();
    return res.json({ data: contacts });
};

export const contactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById({ contactId });
    return res.json({ data: contact });
};

export const contactCreateController = async (req, res) => {
    const entry = req.body;
    const createdContact = await createContact({ entry });
    return res
        .status(201)
        .json({ message: 'contact was created', data: createdContact });
};

export const contactUpdateController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await updateContact({ contactId, entry: req.body });
    if (!contact.isUpdated)
        return res.status(401).json({ errors: ['Contact not exist'] });
    return res.json({ message: 'contact was updated', data: contact.data });
};

export const contactDeleteController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContact({ contactId });
    if (!contact.isDeleted)
        return res.status(401).json({ errors: ['Contact not exist'] });
    return res.json({ message: 'contact was deleted' });
};
