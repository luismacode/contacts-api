import '#Config/env.js';
import httpServer from '#Config/http.js';
import connectDB from '#Database/db.js';
const PORT = process.env.PORT || 4200;
const bootstrap = async () => {
    await connectDB(process.env.MONGODB_URL);

    httpServer.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
};

bootstrap();
