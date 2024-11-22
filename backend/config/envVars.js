import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    MAILTRAP_ENDPOINT: process.env.MAILTRAP_ENDPOINT,
    MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
    CLIENT_URL: process.env.CLIENT_URL,
};