import express from 'express';
import contactRouterV1 from '#RoutesV1/contact.routes.js';
import { swaggerDocs } from '../v1/swagger.js';
const expressApp = express();

expressApp.use(express.json());
expressApp.use('/api/v1/contacts', contactRouterV1);
swaggerDocs(expressApp);
expressApp.use((_, res) => {
    res.status(404).send({
        status: 'failed',
        message: "Sorry, I didn't find what you were looking for."
    });
});

export default expressApp;
