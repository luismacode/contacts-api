import cors from 'cors';
const ACCEPTED_ORIGINS = [`http://localhost:${process.env.PORT}`];
const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
    cors({
        origin: (origin, callback) => {
            if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true);
            if (!origin) return callback(null, true);
            return callback(new Error('Not allowed by CORS'));
        }
    });

export default corsMiddleware;