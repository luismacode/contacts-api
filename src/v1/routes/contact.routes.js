import { Router } from 'express';
const contactRouterV1 = Router();
import contactDto from '#DTO/contact.dto.js';
import {
    contactsController,
    contactByIdController,
    contactCreateController,
    contactUpdateController,
    contactDeleteController
} from '#Controllers/contact.controller.js';

contactRouterV1
    .get('/', contactsController)
    .get('/:contactId', contactByIdController)
    .post('/', contactDto, contactCreateController)
    .patch('/:contactId', contactDto, contactUpdateController)
    .delete('/:contactId', contactDeleteController);

export default contactRouterV1;
