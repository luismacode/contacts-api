import express from 'express';
import contactRouterV1 from '#RoutesV1/contact.routes.js';
import swaggerDocs from '#Docs/swagger.js';
import corsMiddleware from '#Middlewares/cors.js';
import notFound from '#Middlewares/not-found.js';
const expressApp = express();
expressApp.disable('x-powered-by');
expressApp.use(express.json());
expressApp.use(corsMiddleware());
expressApp.use('/api/v1/contacts', contactRouterV1);
swaggerDocs(expressApp);
expressApp.use(notFound);

export default expressApp;
