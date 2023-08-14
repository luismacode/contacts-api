import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact
} from '#Services/contact.services.js';

export const contactsController = async (_, res) => {
    const contacts = await getAllContacts();
    res.send({ status: 'OK', data: contacts });
};

export const contactByIdController = async (req, res) => {
    const contact = await getContactById(req.params.contactId);
    res.send({ status: 'OK', data: contact });
};

export const contactCreateController = async (req, res) => {
    const { name, email, phone, role, isAvailable } = req.body;
    const data = {
        name,
        email,
        phone,
        role,
        isAvailable
    };
    const createdContact = await createContact(data);
    return res.status(201).send({ status: 'OK', data: createdContact });
};

export const contactUpdateController = async (req, res) => {
    const existingContactById = await getContactById(req.params.contactId);
    if (!existingContactById)
        res.send({ code: 401, errors: ['Contact not exist'] });
    await updateContact(req.body, existingContactById);
    res.send(`contact was updated`);
};

export const contactDeleteController = async (req, res) => {
    const existingContactById = await getContactById(req.params.contactId);
    if (!existingContactById)
        res.send({ code: 401, errors: ['Contact not exist'] });
    await existingContactById.deleteOne();
    res.send(`contact was deleted`);
};
